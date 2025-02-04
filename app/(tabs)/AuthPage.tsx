import React, { useState } from 'react';
import { SafeAreaView, KeyboardAvoidingView, Platform, TouchableOpacity, Text, Alert, FlatList, View, StyleSheet, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';

const AuthPage = () => {
    const [state, setState] = useState({
        email: '',
        firstName: '',
        lastName: '',
        username: '',
        dob: new Date(),
        showPicker: false,
        dobString: '',
        gender: null,
        items: [
            { label: 'MALE', value: 'M' },
            { label: 'FEMALE', value: 'F' },
        ],
        weight: '',
        height: '',
        password: '',
        confirmPassword: '',
        isSignUp: true, // Toggle between sign-up and sign-in
    });

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string | null>(null);

    const handleSubmit = async () => {
        if (state.isSignUp) {
            // Handle Sign Up Logic (Registration)
            const ageLimit = 18;
            const userAge = calculateAge(state.dob);

            if (!state.firstName || !state.lastName || !state.username || !state.dobString || !state.email || !state.weight || !state.height || !state.password || !state.confirmPassword) {
                Alert.alert('Error', 'Please fill in all fields.');
            } else if (!isValidEmail(state.email)) {
                Alert.alert('Error', 'Please enter a valid email address.');
            } else if (userAge < ageLimit) {
                Alert.alert('Error', `You must be at least ${ageLimit} years old to register.`);
            } else if (state.password !== state.confirmPassword) {
                Alert.alert('Error', 'Passwords do not match.');
            } else {
                try {
                    const response = await fetch('YOUR_REGISTRATION_API_ENDPOINT', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            firstName: state.firstName,
                            lastName: state.lastName,
                            username: state.username,
                            dob: state.dobString,
                            email: state.email,
                            gender: state.gender,
                            weight: state.weight,
                            height: state.height,
                            password: state.password,
                        }),
                    });

                    if (!response.ok) throw new Error('Network response was not ok');

                    const data = await response.json();
                    Alert.alert('Success', `Welcome, ${data.name || state.firstName}!`);
                } catch (error) {
                    Alert.alert('Error', 'There was an error submitting your information.');
                    console.error(error);
                }
            }
        } else {
            // Handle Sign In Logic (Login)
            if (!state.username || !state.password) {
                Alert.alert('Error', 'Please enter both username and password.');
            } else {
                try {
                    const response = await fetch('YOUR_LOGIN_API_ENDPOINT', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            username: state.username,
                            password: state.password,
                        }),
                    });

                    if (!response.ok) throw new Error('Network response was not ok');

                    const data = await response.json();
                    Alert.alert('Success', `Welcome back, ${data.username}!`);
                } catch (error) {
                    Alert.alert('Error', 'There was an error signing you in.');
                    console.error(error);
                }
            }
        }
    };

    const isValidEmail = (email: string): boolean => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email);
    };

    const calculateAge = (birthDate: Date): number => {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };

    const handleChooseDate = (): void => {
        setState((prevState) => ({ ...prevState, showPicker: true }));
    };

    const onChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || state.dob;
        setState({
            ...state,
            showPicker: false,
            dob: currentDate,
            dobString: currentDate.toISOString().split('T')[0],
        });
    };

    const toggleForm = () => {
        setState((prevState) => ({
            ...prevState,
            isSignUp: !prevState.isSignUp,
        }));
    };

    const renderSignUpForm = () => (
        <>
            <TextInput
                style={styles.input}
                value={state.firstName}
                placeholder="First Name"
                placeholderTextColor="#999"
                onChangeText={(text) => setState((prev) => ({ ...prev, firstName: text }))}
            />
            <TextInput
                style={styles.input}
                value={state.lastName}
                placeholder="Last Name"
                placeholderTextColor="#999"
                onChangeText={(text) => setState((prev) => ({ ...prev, lastName: text }))}
            />
            <TextInput
                style={styles.input}
                value={state.username}
                placeholder="Username"
                placeholderTextColor="#999"
                onChangeText={(text) => setState((prev) => ({ ...prev, username: text }))}
            />
            <TextInput
                style={styles.input}
                value={state.dobString}
                placeholder="Select Date of Birth"
                placeholderTextColor="#999"
                editable={false}
                onTouchStart={handleChooseDate}
            />
            {state.showPicker && (
                <DateTimePicker
                    value={state.dob}
                    mode="date"
                    display="default"
                    onChange={onChange}
                />
            )}
            <TextInput
                style={styles.input}
                value={state.weight}
                placeholder="Weight (kg)"
                placeholderTextColor="#999"
                onChangeText={(text) => setState((prev) => ({ ...prev, weight: text }))}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                value={state.height}
                placeholder="Height (cm)"
                placeholderTextColor="#999"
                onChangeText={(text) => setState((prev) => ({ ...prev, height: text }))}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                value={state.email}
                placeholder="Email Address"
                placeholderTextColor="#999"
                onChangeText={(text) => setState((prev) => ({ ...prev, email: text }))}
                keyboardType="email-address"
            />
            <DropDownPicker
                open={open}
                value={value}
                items={state.items}
                setOpen={setOpen}
                setValue={(val) => {
                    setValue(val);
                    setState((prev) => ({ ...prev, gender: val }));
                }}
                placeholder="Select Gender"
            />
            <TextInput
                style={styles.input}
                value={state.password}
                placeholder="Password"
                placeholderTextColor="#999"
                onChangeText={(text) => setState((prev) => ({ ...prev, password: text }))}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                value={state.confirmPassword}
                placeholder="Confirm Password"
                placeholderTextColor="#999"
                onChangeText={(text) => setState((prev) => ({ ...prev, confirmPassword: text }))}
                secureTextEntry
            />
        </>
    );

    const renderSignInForm = () => (
        <>
            <TextInput
                style={styles.input}
                value={state.username}
                placeholder="Username"
                placeholderTextColor="#999"
                onChangeText={(text) => setState((prev) => ({ ...prev, username: text }))}
            />
            <TextInput
                style={styles.input}
                value={state.password}
                placeholder="Password"
                placeholderTextColor="#999"
                onChangeText={(text) => setState((prev) => ({ ...prev, password: text }))}
                secureTextEntry
            />
        </>
    );

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <FlatList
                    data={[1]} // Dummy data to render one item
                    renderItem={() => (
                        <View style={styles.formWrapper}>
                            <View style={styles.formContainer}>
                                {state.isSignUp ? renderSignUpForm() : renderSignInForm()}
                                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                    <Text style={styles.buttonText}>
                                        {state.isSignUp ? 'Register' : 'Sign In'}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={toggleForm} style={styles.toggleFormText}>
                                    <Text style={styles.toggleFormText}>
                                        {state.isSignUp ? 'Already have an account? Login' : 'Don’t have an account? Register'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    formWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    formContainer: {
        width: '100%',
        maxWidth: 400, // Optional: You can limit the width of the form
        paddingVertical: 20,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        borderRadius: 8,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
    toggleFormText: {
        marginTop: 10,
        color: '#007bff',
        textAlign: 'center',
    },
});

export default AuthPage;
