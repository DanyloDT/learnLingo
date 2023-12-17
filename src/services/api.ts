import { auth, db } from "@/firebase/config";
import { FirebaseError } from "firebase/app";

import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  User as FirebaseUser,
} from "firebase/auth";
import {
  DocumentSnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  startAfter,
  where,
} from "firebase/firestore";

import {
  LoginParamsApi,
  RegisterParamsApi,
  Teacher,
  UserData,
} from "@/utils/definitions";

interface SearchParams {
  languages?: string;
  level?: string;
  price?: string;
}

interface Result {
  teachers: Teacher[];
  lastVisible?: DocumentSnapshot;
}

export const register = async ({
  name,
  email,
  password,
}: RegisterParamsApi): Promise<UserData | void> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    if (user) {
      const typedUser: FirebaseUser = user;

      await updateProfile(typedUser, {
        displayName: name,
      });
      const data = {
        name: user.displayName,
        email: user.email,
      };

      return data;
    }
  } catch (error) {
    const firebaseError = error as FirebaseError;
    throw new Error(firebaseError.code);
  }
};

export const login = async ({
  email,
  password,
}: LoginParamsApi): Promise<UserData | void> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const data = {
      name: user.displayName,
      email: user.email,
    };

    return data;
  } catch (error) {
    const firebaseError = error as FirebaseError;
    throw new Error(firebaseError.message);
  }
};

export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    const firebaseError = error as FirebaseError;
    throw new Error(firebaseError.message);
  }
};

export const getAllTeachersForFilters = async () => {
  try {
    const teachersCollection = collection(db, "teachers");
    const teachersSnapshot = await getDocs(teachersCollection);

    const teachersData = teachersSnapshot.docs.map((doc) => doc.data());

    const uniqueLanguages = [
      ...new Set(teachersData.flatMap((teacher) => teacher.languages)),
    ].sort();
    const uniqueLevels = [
      ...new Set(
        teachersData.flatMap((teacher) => Object.keys(teacher.levels))
      ),
    ].sort();
    const uniquePrices = [
      ...new Set(teachersData.map((teacher) => teacher.price_per_hour)),
    ].sort();

    return {
      uniqueLanguages,
      uniqueLevels,
      uniquePrices,
    };
  } catch (error) {
    const firebaseError = error as FirebaseError;
    throw new Error(firebaseError.message);
  }
};

export const getTeachersData = async (
  searchParams: SearchParams = {},
  lastDoc: DocumentSnapshot | null = null
): Promise<Result> => {
  const { languages, level, price } = searchParams;
  const pageSize = 4;
  let q = query(collection(db, "teachers"));

  if (languages && languages !== "---") {
    q = query(q, where("languages", "array-contains", languages));
  }
  if (level && level !== "---") {
    q = query(q, where(`levels.${level}`, "==", true));
  }
  if (price && price !== "---") {
    const priceNumber = parseInt(price);
    if (!isNaN(priceNumber)) {
      q = query(q, where("price_per_hour", "==", priceNumber));
    }
  }

  if (lastDoc) {
    q = query(q, startAfter(lastDoc), limit(pageSize));
  } else {
    q = query(q, limit(pageSize));
  }

  try {
    const documentSnapshots = await getDocs(q);
    let favoriteTeacherIds: string[] = [];

    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const favoritesSnapshot = await getDocs(
        query(collection(db, "favorites"), where("userId", "==", userId))
      );

      favoriteTeacherIds = favoritesSnapshot.docs.map(
        (doc) => doc.data().teacherId
      );
    } else {
      console.log("User is not logged in, skipping favorites query.");
    }

    const teachers: Teacher[] = documentSnapshots.docs.map((doc) => {
      const isFavorite = favoriteTeacherIds.includes(doc.id);
      return {
        id: doc.id,
        ...doc.data(),
        favorite: isFavorite,
      } as Teacher;
    });

    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];

    return { teachers, lastVisible };
  } catch (error) {
    const firebaseError = error as FirebaseError;
    throw new Error("Error in getTeachersData: " + firebaseError.message);
  }
};

export const getFavorites = async (
  lastDoc: DocumentSnapshot | null = null,
  pageSize: number = 4
) => {
  const userId = auth.currentUser?.uid;
  if (!userId) {
    throw new Error("User is not authorized");
  }

  try {
    let q = query(collection(db, "favorites"), where("userId", "==", userId));

    if (lastDoc) {
      q = query(q, startAfter(lastDoc), limit(pageSize));
    } else {
      q = query(q, limit(pageSize));
    }

    const querySnapshot = await getDocs(q);
    const favorites = querySnapshot.docs.map((doc) => doc.data().teacherId);

    const teachers = [];
    for (const teacherId of favorites) {
      const docRef = doc(db, "teachers", teacherId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const teacherData = docSnap.data() as Teacher;
        teachers.push({
          ...teacherData,
          id: docSnap.id,
          favorite: true,
        });
      }
    }

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    return { teachers, lastVisible };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
