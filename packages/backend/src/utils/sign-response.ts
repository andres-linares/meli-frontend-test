import config from "config";
import { Author } from "~/types/author";

interface Signed {
  author: Author;
}

const signResponse = <T>(response: T): T & Signed => {
  const name = config.get("author.name") as string;
  const lastname = config.get("author.lastname") as string;

  return {
    author: { name, lastname },
    ...response,
  };
};

export default signResponse;
