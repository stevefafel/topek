import Immutable from "immutable"
import User from "./User"

const Topic = Immutable.Record({
  id: null,
  createdAt: null,
  updatedAt: null,
  name: "",
  owner: new User(),
  details: new Immutable.List()
})

Topic.fromParse = (topic) => {
  let res = new Topic()
    .set("id", topic.id)
    .set("createdAt", topic.createdAt)
    .set("updatedAt", topic.updatedAt)
    .set("name", topic.get("name"))
    .set("details", topic.get("details"))
  if (topic.get("owner")) {
    res = res.set("owner", User.fromParse(topic.get("owner")))
  }
  return res;
}

export default Topic;