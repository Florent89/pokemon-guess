import { initializeApp } from "firebase/app";
import {
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAINE,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSENGING_SERVER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

export type Gamer = {
  id: number;
  score: number;
  pseudo: string;
  level: string;
  generation: number;
  created: Date;
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default class GamerScoreService {
  static addGamerScore = async (gamer: Gamer) => {
    try {
      const docRef = await addDoc(collection(db, "users"), gamer);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  static getGamerScores = async () => {
    let listScore: any[] = [];
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      listScore.push(doc.data());
    });
    return listScore;
  };

  static getGamersByLevel = async (level: string) => {
    let listScore: any[] = [];
    const q = query(collection(db, "users"), where("level", "==", level));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      listScore.push(doc.data());
    });
    return listScore;
  };

  static getGamersByPseudo = async (pseudo: string) => {
    let listScore: any[] = [];
    const q = query(collection(db, "users"), where("pseudo", "==", pseudo));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      listScore.push(doc.data());
    });
    return listScore;
  };

  static getGamersByGeneration = async (generation: number) => {
    let listScore: any[] = [];
    const q = query(
      collection(db, "users"),
      where("generation", "==", generation)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      listScore.push(doc.data());
    });
    return listScore;
  };

  app = initializeApp(firebaseConfig);

  db = getFirestore(app);
}
