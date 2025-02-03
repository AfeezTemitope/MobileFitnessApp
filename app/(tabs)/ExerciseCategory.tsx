import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

const ExerciseCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchExerciseCategories();
    }, []);

    const fetchExerciseCategories = async () => {
        try {
            const response = await fetch('https://wger.de/api/v2/exercisecategory/');
            const data = await response.json();
            setCategories(data.results);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching exercise categories:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View>
            <Text>Exercise Categories:</Text>
            <FlatList
                data={categories}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Text>{item.name}</Text>}
            />
        </View>
    );
};

export default ExerciseCategories;
