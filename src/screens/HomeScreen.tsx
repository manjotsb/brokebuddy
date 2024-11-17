import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { TransactionEntry, TransactionType_bgColor, getInitialData } from '../utils/utility';


// type Props = StackScreenProps<RootStackParamList, 'Home'>;

// export interface Transaction {
//   id: string;
//   title: string;
//   description: string;
//   amount: number;
//   type: 'Essential' | 'Leisure' | 'Others';
// }

export default function HomeScreen({ navigation }: any) {
  const [transactions, setTransactions] = useState<TransactionEntry[]>([]);

  useEffect(() => {
    setTransactions(getInitialData());
  },[])

  const renderItem = ({item}: {item: TransactionEntry}) => (
    <TouchableOpacity style={[styles.transactionItem, { backgroundColor: TransactionType_bgColor[item.type]}]}
    onPress={() =>navigation.navigate('ViewDetails', {transactionId: item.id})}>
      <Text>{item.title}</Text>
      <Text>{item.amount.toFixed(2)}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      {transactions.length === 0 ? (
        <Text style={styles.emptyMessage}>No transactions yet!</Text>
      ) : (
        <FlatList
          data={transactions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddTransaction')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  emptyMessage: { textAlign: 'center', marginTop: 20 },
  transactionItem: { padding: 16, marginVertical: 8, borderRadius: 8 },
  fab: { position: 'absolute', bottom: 20, right: 20, backgroundColor: 'blue', borderRadius: 50, padding: 20 },
  fabText: { color: 'white', fontSize: 24, textAlign:'center' },
});
