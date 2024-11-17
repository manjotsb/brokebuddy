import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { getTransactionByID } from '../utils/utility';

type Props = StackScreenProps<RootStackParamList, 'ViewDetails'>;

export default function ViewDetailsScreen({ route, navigation }: Props) {
  const { transactionId } = route.params;
  const transaction = getTransactionByID(transactionId);

  if(!transaction) {
    return(
      <View style={styles.container}>
        <Text>Transaction Not Found!</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text>Title: {transaction.title}</Text>
      <Text>Description: {transaction.desc}</Text>
      <Text>Amount: {transaction.amount}</Text>
      <Text>Type: {transaction.type}</Text>
      <Button title="Edit" onPress={() => navigation.navigate('AddTransaction', { transactionId})} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 }
});
