var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-2",
  endpoint: "https://dynamodb.us-east-2.amazonaws.com",
  // endpoint: "http://localhost:8000"
});
const docClient = new AWS.DynamoDB.DocumentClient();

// example input: postScore("normal", "John", 81, 0);
async function postScore(kind, name, wpm, errors) {
  try {
    const params = {
      TableName: "Scores",
      Item: {
        username: name,
        wpm: Number(wpm),
        info: {
          kind,
          errors: Number(errors),
        },
      },
    };
    const result = await docClient.put(params).promise();
    console.log("Added item:", result);
  } catch (err) {
    console.log(err);
  }
}

// returns: the array itself
async function fetchScores(kind) {
  let scores = [];
  try {
    const params = {
      TableName: "Scores",
    };

    let items;
    do {
      items = await docClient.scan(params).promise();
      items.Items.forEach((item) => {
        if (item.info.kind === kind) {
          scores.push(item);
        }
      });
      params.ExclusiveStartKey = items.LastEvaluatedKey;
    } while (typeof items.LastEvaluatedKey !== "undefined");
  } catch (err) {
    console.log(err);
  }
  const sorted = scores.sort((a, b) => {
    if (a.wpm > b.wpm) {
      return -1;
    } else if (a.wpm < b.wpm) {
      return 1;
    } else {
      if (a.info.errors < b.info.errors) {
        return -1;
      } else if (a.info.errors > b.info.errors) {
        return 1;
      } else {
        // if wpm and errors are equal, it doesn't really matter which one goes first.
        return -1;
      }
    }
  });
  return sorted;
}

module.exports = {
  postScore,
  fetchScores,
};
