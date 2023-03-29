import React, { useEffect, useRef, useState } from "react";

//database
import usersList from "../Database/usersList.json";

//style
import "./_Main.scss";

//icons
import { TbDotsVertical, TbUsers, TbFileDescription } from "react-icons/tb";

function Main() {
  const [list, setList] = useState(usersList);
  const [dragging, setDragging] = useState(false);
  const dargItem = useRef();
  const dargNode = useRef();

  const count = usersList.map((item) => item.users.length);
  let usersCount = count.reduce((a, b) => a + b, 0);

  const handleDargStart = (e, params) => {
    dargItem.current = params;
    dargNode.current = e.target;
    dargNode.current.addEventListener("dragend", handleDargEnd);
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDargEnter = (e, params) => {
    const currentItem = dargItem.current;

    if (e.target !== dargNode.current) {
      setList((oldList) => {
        let newList = JSON.parse(JSON.stringify(oldList));
        newList[params.key].users.splice(
          params.userkey,
          0,
          newList[currentItem.key].users.splice(currentItem.userkey, 1)[0]
        );
        dargItem.current = params;
        return newList;
      });
    }
  };

  const handleDargEnd = () => {
    setDragging(false);
    dargNode.current.removeEventListener("dragend", handleDargEnd);
    dargItem.current = null;
    dargNode.current = null;
  };

  const getStyles = (params) => {
    const currnetItem = dargItem.current;
    if (currnetItem.key === params.key && currnetItem.userkey === params.userkey) {
      return "current main__box";
    }
    return "main__box";
  };

  return (
    <>
      <h2 className="main__stitle">
        Заявки <span className="main__dot"></span>
        <span className="main__tcount">{usersCount}</span>
      </h2>
      <ul
        className="main__list"
        style={{ gridTemplateColumns: `repeat(${list.length}, 274px)` }}
      >
        {list.map((usersList, key) => {
          return (
            <li key={key + 1} className="main__item">
              <div
                onDragEnter={
                  dragging && !usersList.users.length
                    ? (e) => handleDargEnter(e, { key, userkey: 0 })
                    : null
                }
                className="main__title"
              >
                {usersList.title} <span></span> {usersList.users.length}
              </div>
              <div className="main__boxs">
                {usersList.users.length === 0 ? (
                  <div
                    onDragEnter={
                      dragging && !usersList.users.length
                        ? (e) => handleDargEnter(e, { key, userkey: 0 })
                        : null
                    }
                    className="main__not"
                  >
                    <img
                      className="main__nimg"
                      src="/images/none.png"
                      width={164}
                      height="140"
                    />
                    <p className="main__ntext">
                      Если есть подходящие заявки, перетащите их сюда 🤓
                    </p>
                  </div>
                ) : (
                  usersList.users.map((user, userkey) => {
                    return (
                      <div
                        draggable
                        key={userkey + 8}
                        onDragStart={(e) => {
                          handleDargStart(e, { key, userkey });
                        }}
                        onDragEnter={
                          dragging
                            ? (e) => {
                                handleDargEnter(e, { key, userkey });
                              }
                            : null
                        }
                        className={
                          dragging ? getStyles({ key, userkey }) : "main__box"
                        }
                      >
                        <div className="main__topbox">
                          <div>
                            <p className="main__occ">{user.occ}</p>
                            <p className="main__occ-text">{user.occtext}</p>
                          </div>

                          <TbDotsVertical />
                        </div>

                        <div className="main__pbox">
                          <p className="main__pri">{user.pri}</p>
                          <p className="main__pri main__pri-count">
                            <TbUsers /> 4
                          </p>
                          <p className="main__pri main__pri-count">
                            <TbFileDescription /> 182
                          </p>
                        </div>

                        <div className="main__ibox">
                          <img
                            className="main__avatar"
                            src={"/images/avatar/ava2.png"}
                            alt="img"
                            width={28}
                            height="28"
                          />
                          <div>
                            <p className="main__itext">{user.role}</p>
                            <p className="main__name">{user.name}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Main;
