import EditScreenInfo from '@/components/EditScreenInfo'
import { Text, View } from '@/components/Themed'
import { loginUser, registerUser, resetPassword } from '@/services/firebase/firebaseFunctions'
import { useState } from 'react'
import { Button, StyleSheet, TextInput } from 'react-native'

export default function AuthenticationScreen() {
  const [email, setEmail] = useState('zajas.piotr@gmail.com')
  const [password, setPassword] = useState('ppp123')

  const handleRegister = async () => {
    await registerUser({ email, password })
  }

  const handleLogin = async () => {
    await loginUser({ email, password })
  }

  const handleResetPassword = async () => {
    await resetPassword({ email })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Authentication Screen</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Register" onPress={handleRegister} />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Reset Passwords" onPress={handleResetPassword} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5
  }
})
