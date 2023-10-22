var dogs = [
  {
    breed: "Labrador Retriever",
    age: 5,
    color: "Golden",
    weight_kg: 30,
  },
  {
    breed: "German Shepherd",
    age: 3,
    color: "Black and Tan",
    weight_kg: 35,
  },
  {
    breed: "Poodle",
    age: 2,
    color: "White",
    weight_kg: 10,
  },
];

exports.handler = async (event, context) => {
  const { method, path } = event.requestContext.http;

  if (method === "GET" && path === "/dog") {
    return {
      statusCode: 200,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ dogs }),
    };
  }
  else if (method === "POST" && path === "/dog") {
    const body = JSON.parse(event.body);
    dogs.push(body);

    return {
        statusCode: 200,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ success : true }),

    };
  }

  return "Hej";
};
