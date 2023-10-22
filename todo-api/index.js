// Gör ett enkelt todo api i en Lambda-funktion där man kan hämta, spara, uppdatera och ta bort todos. Du kan spara alla todos i en variabel.

var todos = [
  {
    task: "Drink water",
    done: false,
  },
  {
    task: "Go for a walk",
    done: true,
  },
  {
    task: "Learn AWS",
    done: false,
  },
  {
    task: "Have a jog",
    done: false,
  },
  {
    task: "Eat chicken",
    done: true,
  },
];

exports.handler = async (event, context) => {
  const { method, path } = event.requestContext.http;
  if (method === "GET" && path === "/todo") {
    return {
      statusCode: 200,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ todos }),
    };
  } else if (method === "POST" && path === "/todo") {
    const body = JSON.parse(event.body);
    todos.push(body);

    return {
      statusCode: 200,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ success: true }),
    };
  } else if (method === "PUT" && path === "/todo") {
    const body = JSON.parse(event.body);

    for (let i = 0; i < todos.length; i++) {
        if (todos[i].task === body.task) {
            todos[i].done = !todos[i].done;
        }
    }

    return {
        statusCode: 200,
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ success: true }),
    };

  } else if (method === "DELETE" && path === "/todo") {
    const body = JSON.parse(event.body);

    for (let i = 0; i < todos.length; i++) {
        if (todos[i].task === body.task) {
            todos.splice(i, 1);
        }
    }

    return {
        statusCode: 200,
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ success: true }),
    };
  }
};
