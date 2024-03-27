import { createSlice } from "@reduxjs/toolkit";

const initialState = {
      data: {
        "history": [
          {
            "pid": 1,
            "_id": 101,
            "title": "The Fall of the Roman Empire",
            "thumbnail": "https://res.cloudinary.com/duuwrm4bh/image/upload/v1703237342/uliultxepgotaitlqia0.jpg"
          },
          {
            "pid": 2,
            "_id": 102,
            "title": "The Age of Exploration",
            "thumbnail": "https://res.cloudinary.com/duuwrm4bh/image/upload/v1703237342/uliultxepgotaitlqia0.jpg"
          },
          {
            "pid": 3,
            "_id": 103,
            "title": "The American Revolution",
            "thumbnail": "https://res.cloudinary.com/duuwrm4bh/image/upload/v1703237342/uliultxepgotaitlqia0.jpg"
          },
          {
            "pid": 4,
            "_id": 104,
            "title": "The Black Death",
            "thumbnail": "https://res.cloudinary.com/duuwrm4bh/image/upload/v1703237342/uliultxepgotaitlqia0.jpg"
          },
          {
            "pid": 5,
            "_id": 105,
            "title": "The Crusades",
            "thumbnail": "https://res.cloudinary.com/duuwrm4bh/image/upload/v1703237342/uliultxepgotaitlqia0.jpg"
          },
          {
            "pid": 6,
            "_id": 106,
            "title": "The Mongol Empire",
            "thumbnail": "https://res.cloudinary.com/duuwrm4bh/image/upload/v1703237342/uliultxepgotaitlqia0.jpg"
          },
          {
            "pid": 7,
            "_id": 107,
            "title": "The Age of Enlightenment",
            "thumbnail": "https://res.cloudinary.com/duuwrm4bh/image/upload/v1703237342/uliultxepgotaitlqia0.jpg"
          },
          {
            "pid": 8,
            "_id": 108,
            "title": "The Spanish Inquisition",
            "thumbnail": "https://res.cloudinary.com/duuwrm4bh/image/upload/v1703237342/uliultxepgotaitlqia0.jpg"
          },
          {
            "pid": 9,
            "_id": 109,
            "title": "The Ottoman Empire",
            "thumbnail": "https://res.cloudinary.com/duuwrm4bh/image/upload/v1703237342/uliultxepgotaitlqia0.jpg"
          },
          {
            "pid": 10,
            "_id": 110,
            "title": "The Berlin Wall",
            "thumbnail": "https://res.cloudinary.com/duuwrm4bh/image/upload/v1703237342/uliultxepgotaitlqia0.jpg"
          }
        ],
        "science": [
          {
            "id": 1,
            "pid": 301,
            "title": "The Laws of Thermodynamics",
            "thumbnail": "https://res.cloudinary.com/duuwrm4bh/image/upload/v1703237342/uliultxepgotaitlqia0.jpg"
          },
          {
            "id": 2,
            "pid": 302,
            "title": "The Discovery of Electromagnetism",
            "thumbnail": "https://res.cloudinary.com/duuwrm4bh/image/upload/v1703237342/uliultxepgotaitlqia0.jpg"
          },
          {
            "id": 3,
            "pid": 303,
            "title": "The Theory of Quantum Mechanics",
            "thumbnail": "https://res.cloudinary.com/duuwrm4bh/image/upload/v1703237342/uliultxepgotaitlqia0.jpg"
          },
          {
            "id": 4,
            "pid": 304,
            "title": "The Human Genome Project",
            "thumbnail": "https://res.cloudinary.com/duuwrm4bh/image/upload/v1703237342/uliultxepgotaitlqia0.jpg"
          },
          {
            "id": 5,
            "pid": 305,
            "title": "The Theory of General Relativity",
            "thumbnail": "https://res.cloudinary.com/duuwrm4bh/image/upload/v1703237342/uliultxepgotaitlqia0.jpg"
          },
          {
            "id": 6,
            "pid": 306,
            "title": "The Discovery of Atomic Structure",
            "thumbnail": "https://res.cloudinary.com/duuwrm4bh/image/upload/v1703237342/uliultxepgotaitlqia0.jpg"
          },
          {
            "id": 7,
            "pid": 307,
            "title": "The Theory of Special Relativity",
            "thumbnail": "https://res.cloudinary.com/duuwrm4bh/image/upload/v1703237342/uliultxepgotaitlqia0.jpg"
          },
          {
            "id": 8,
            "pid": 308,
            "title": "The Discovery of Radioactivity",
            "thumbnail": "https://res.cloudinary.com/duuwrm4bh/image/upload/v1703237342/uliultxepgotaitlqia0.jpg"
          },
          {
            "id": 9,
            "pid": 309,
            "title": "The Theory of Natural Selection",
            "thumbnail": "https://res.cloudinary.com/duuwrm4bh/image/upload/v1703237342/uliultxepgotaitlqia0.jpg"
          },
          {
            "id": 10,
            "pid": 310,
            "title": "The Theory of Continental Drift",
            "thumbnail": "https://res.cloudinary.com/duuwrm4bh/image/upload/v1703237342/uliultxepgotaitlqia0.jpg"
          }
        ]
      }
      ,
  };

const tempData = createSlice({
    name: "tempData",
    initialState,
    reducers: {
      setAddData: (state, action) => {
        state.data = action.payload;
      },
    },
  });

  export const { setAddData } = tempData.actions;
export default tempData.reducer;