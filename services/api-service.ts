import { 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  deleteDoc, 
  collection, 
  query, 
  where, 
  orderBy, 
  Timestamp 
} from 'firebase/firestore'
import { db } from '@/config/firebase'

export class ApiService {
  // Cloud Save Operations
  static async saveToCloud(saveData: string, userId: string, name?: string) {
    const saveRef = doc(collection(db, 'saves'))
    await setDoc(saveRef, {
      userId,
      saveData,
      name,
      timestamp: Timestamp.now()
    })
    return saveRef.id
  }

  static async loadSave(saveId: string, userId: string) {
    const saveRef = doc(db, 'saves', saveId)
    const saveDoc = await getDoc(saveRef)
    
    if (!saveDoc.exists() || saveDoc.data().userId !== userId) {
      throw new Error('Save not found or unauthorized')
    }
    
    return saveDoc.data()
  }

  static async listSaves(userId: string) {
    const savesQuery = query(
      collection(db, 'saves'),
      where('userId', '==', userId),
      orderBy('timestamp', 'desc')
    )
    
    const querySnapshot = await getDocs(savesQuery)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  }

  static async deleteSave(saveId: string, userId: string) {
    const saveRef = doc(db, 'saves', saveId)
    const saveDoc = await getDoc(saveRef)
    
    if (!saveDoc.exists() || saveDoc.data().userId !== userId) {
      throw new Error('Save not found or unauthorized')
    }
    
    await deleteDoc(saveRef)
  }

  // User Profile Operations
  static async updateUserProfile(userId: string, data: {
    displayName?: string
    email?: string
    avatar?: string
  }) {
    const userRef = doc(db, 'users', userId)
    const updateData: any = {}

    if (data.displayName) {
      updateData.displayName = data.displayName
    }

    if (data.email) {
      updateData.email = data.email
    }

    if (data.avatar) {
      updateData.photoURL = data.avatar
    }

    await setDoc(userRef, updateData, { merge: true })
    return updateData
  }

  // Game State Operations
  static async saveGameState(userId: string, gameState: any) {
    const stateRef = doc(db, 'gameStates', userId)
    await setDoc(stateRef, {
      ...gameState,
      lastUpdated: Timestamp.now()
    }, { merge: true })
  }

  static async loadGameState(userId: string) {
    const stateRef = doc(db, 'gameStates', userId)
    const stateDoc = await getDoc(stateRef)
    return stateDoc.exists() ? stateDoc.data() : null
  }

  // Achievements and Statistics
  static async updateAchievements(userId: string, achievements: any) {
    const achievementsRef = doc(db, 'achievements', userId)
    await setDoc(achievementsRef, achievements, { merge: true })
  }

  static async getAchievements(userId: string) {
    const achievementsRef = doc(db, 'achievements', userId)
    const achievementsDoc = await getDoc(achievementsRef)
    return achievementsDoc.exists() ? achievementsDoc.data() : {}
  }

  static async updateStatistics(userId: string, statistics: any) {
    const statsRef = doc(db, 'statistics', userId)
    await setDoc(statsRef, {
      ...statistics,
      lastUpdated: Timestamp.now()
    }, { merge: true })
  }

  static async getStatistics(userId: string) {
    const statsRef = doc(db, 'statistics', userId)
    const statsDoc = await getDoc(statsRef)
    return statsDoc.exists() ? statsDoc.data() : {}
  }
}
