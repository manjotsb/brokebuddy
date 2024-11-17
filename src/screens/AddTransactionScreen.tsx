import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { addEditTransaction, getTransactionByID, TransactionEntry, getNewID } from '../utils/utility';

type Props = StackScreenProps<RootStackParamList, 'AddTransaction'>;

export default function AddTransactionScreen({ navigation, route }: Props) {

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState(0);

  const transactionId = route.params?.transactionId;
  const isEditMode = !!transactionId;

  useEffect(() => {
    if(isEditMode) {
      const transaction = getTransactionByID(transactionId);
      if(transaction) {
        setTitle(transaction.title);
        setDesc(transaction.desc);
        setAmount(transaction.amount.toString());
        setType(transaction.type);
      }
    }
  }, [transactionId]);

  const handleSave = () => {

    if (!title || !desc || !amount) {
      Alert.alert('All fields are Required!');
      return;
    }

    const newTransaction: TransactionEntry = {
      id: isEditMode ? transactionId : getNewID(),
      title,
      desc,
      amount: parseFloat(amount),
      type,
    };

    addEditTransaction(newTransaction);
    navigation.navigate('Home');
  }

  return (
    <View style={styles.container}>
      <Text>Title</Text>
      <TextInput value={title} onChangeText={setTitle} style={styles.input} />
      <Text>Description</Text>
      <TextInput value={desc} onChangeText={setDesc} style={styles.input} />
      <Text>Amount</Text>
      <TextInput value={amount} onChangeText={setAmount} style={styles.input} keyboardType="numeric" />
      <Text>Type</Text>
      <TextInput value={type.toString()} onChangeText={(text) => setType(parseInt(text))}  style={styles.input} placeholder="Essential, Leisure, Others" />
      <Button title={isEditMode ? 'Update Transaction' : 'Add Transaction'} onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { borderBottomWidth: 1, marginBottom: 12, padding: 8 }
});
