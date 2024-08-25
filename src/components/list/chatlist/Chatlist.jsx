import React, { useEffect, useState } from "react";
import "./chatlist.css";
import AddUser from "./addUser/addUser";
import { useUserStore } from "../../../lib/userStore";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";

const Chatlist = () => {
  const [addMode, SetaddMode] = useState(false);
  const [chats, setChats] = useState([]);
  const { currentUser } = useUserStore();

  useEffect(() => {
    if (!currentUser || !currentUser.id) return;

    const unSub = onSnapshot(doc(db, "userschats", currentUser.id), async (res) => {
      if (!res.exists()) {
        console.error("Document does not exist.");
        return;
      }

      const data = res.data();
      if (!data || !data.chats) {
        console.error("Chats property is missing.");
        return;
      }

      const items = data.chats;

      const promises = items.map(async (item) => {
        const userDocRef = doc(db, "users", item.receiverId);
        const userDocSnap = await getDoc(userDocRef);

        const user = userDocSnap.data();
        return { ...item, user };
      });

      const chatData = await Promise.all(promises);
      setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
    });

    return () => {
      unSub();
    };
  }, [currentUser]);

  return (
    <div className="chatlist">
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="" />
          <input type="text" placeholder="Search" />
        </div>
        <img
          src={addMode ? "./minus.png" : "./plus.png"}
          alt=""
          className="add"
          onClick={() => SetaddMode((prev) => !prev)}
        />
      </div>
      {chats.map((chat) => (
        <div className="item" key={chat.chatId}>
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>{chat.user.name || "Unknown"}</span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}

      {addMode && <AddUser />}
    </div>
  );
};

export default Chatlist;
