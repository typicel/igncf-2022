import Header from "../components/Header";
import React, { useState } from "react";
import { Button, Group, Paper, Textarea, TextInput } from "@mantine/core";
import { useRouter } from "next/router";

const CreatePoll = () => {
  let router = useRouter();

  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [options, setOptions] = useState(["", ""]);

  console.log(options);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = {
      title: title,
      description: description,
      possible_responses: options,
    };

    try {
      fetch("/api/createPoll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        console.log(res);
        // router.push(`/pollpage/${res.id}`);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          className="poll-paper"
          shadow="sm"
          style={{ width: "100vh", textAlign: "center", padding: "20px" }}
        >
          <h1> Create new Poll </h1>
          <form onSubmit={handleSubmit}>
            <TextInput
              placeholder="Question"
              style={{ marginBottom: "20px" }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {options.map((_, index) => (
              <Group
                position="center"
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  margin: "10px",
                }}
              >
                <TextInput
                  placeholder={`Option ${index + 1}`}
                  value={options[index]}
                  onChange={(e) =>
                    setOptions(
                      options.map((option, i) =>
                        i === index ? e.target.value : option
                      )
                    )
                  }
                />
              </Group>
            ))}

            <Button
              type="button"
              variant="light"
              onClick={() => setOptions([...options, ""])}
            >
              Add Option
            </Button>
            <br />
            <Button color="green" variant="light" type="submit">
              Create Poll
            </Button>
          </form>
        </Paper>
      </div>
    </>
  );
};

export default CreatePoll;
