import {Text, TouchableOpacity, View, Image} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import {useRouter} from 'expo-router'

export default function index() {
    const route = useRouter();
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={{uri: 'https://media.istockphoto.com/id/1078955214/photo/trainer-showing-exercise-with-dumbbells.jpg?s=612x612&w=0&k=20&c=JqBZn-JmZrXTyVh05BXSSEjnCoNEKPKnfC7uaLBo0g4='}}
                    style={{
                        width: '90%',
                        height: '90%',
                        borderRadius: 30,
                    }}
                    resizeMode={'cover'}
                />
            </View>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#2fe104',
                        borderRadius: 10,
                        padding: 15,
                        elevation: 3, //shadow on android
                        shadowColor: '#000', //shadow on ios
                        shadowOffset: {width: 0, height: 5},
                        shadowOpacity: 0.3,
                        shadowRadius: 3,
                        }}
                    onPress={()=>{route.push('/ExerciseCategory')}}
                >
                    <Text style={{textAlign: 'center', color: '#ffffff', fontSize: 20}}>Get Started!!</Text>
                </TouchableOpacity>
            {/*<Button*/}
            {/*    title='Get started'*/}
            {/*    color='2FE104'*/}
            {/*    onPress={() => {}}*/}
            {/*    accessibilityLabel='Get started'/>*/}
            </View>
        </SafeAreaView>
    );
}
