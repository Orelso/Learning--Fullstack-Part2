const Notification = ({ message }) => { //* if message.msg is not defined return nothing(null)
  if (!message.msg) {
    return null;
  } else if (message.type === "greenBorder") {
    return (
      <div
        style={{
          color: "green",
          fontSize: 20,
          background: "lightgrey",
          borderStyle: "solid",
          borderRadius: 5,
          padding: 10,
          marginTop: 10,
        }}
      >
        {message.msg}
      </div>
    );
  }

  return (
    <div
      style={{
        color: "red",
        fontSize: 20,
        background: "lightgrey",
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
      }}
    >
      {message.msg}
    </div>
  );
};

export default Notification;
