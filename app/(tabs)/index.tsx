import HomePage from "./../../src/screens/HomePage";
import Layout from "../laayout";
import NewItem from "./../../src/components/NewItem";

export default function Home() {

  return (
    <Layout>
      <HomePage />
      <NewItem />
    </Layout>
  );
}
