import config from "config";

const signResponse = (response: any) => {
  const name = config.get("author.name") as string;
  const lastname = config.get("author.lastname") as string;

  return {
    author: { name, lastname },
    ...response,
  };
};

export default signResponse;
