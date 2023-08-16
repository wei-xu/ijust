import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated, Easing, StyleSheet } from 'react-native';

const DropdownTextInput = () => {
    const [isTextInputVisible, setIsTextInputVisible] = useState(false);
    const [textInputValue, setTextInputValue] = useState('');
    const [animation] = useState(new Animated.Value(0));
    const [componentBeneathAnimation] = useState(new Animated.Value(0));

  const handleInputChange = text => {
    setTextInputValue(text);
  };

  const handleInputSubmit = () => {
    // Do something with the submitted text
    console.log('Submitted text:', textInputValue);

    // Hide the text input
    toggleTextInput();
  };

  const toggleTextInput = () => {
    if (isTextInputVisible) {
      // Hide the text input and slide up the component beneath
      Animated.parallel([
        Animated.timing(animation, {
          toValue: 0,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(componentBeneathAnimation, {
          toValue: 0,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsTextInputVisible(false);
        setTextInputValue('');
      });
    } else {
      // Show the text input and slide down the component beneath
      setIsTextInputVisible(true);
      Animated.parallel([
        Animated.timing(animation, {
          toValue: 1,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(componentBeneathAnimation, {
          toValue: 1,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const inputContainerStyle = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 50],
        }),
      },
    ],
  };

  const containerHeight = isTextInputVisible ? 100 : 0;

  const componentBeneathStyle = {
    // opacity: animation,
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 50],
        }),
      },
    ],
  };

  return (
    <View style={{ padding: 20 }}>
      <TouchableOpacity onPress={toggleTextInput}>
        <Text>Show Text Input</Text>
      </TouchableOpacity>

      <View style={{ height: containerHeight, overflow: 'hidden', marginTop: 10 }}>
        {isTextInputVisible && (
          <Animated.View style={inputContainerStyle}>
            <TextInput
              style={{ borderBottomWidth: 1, marginBottom: 10 }}
              placeholder="Input text..."
              value={textInputValue}
              onChangeText={handleInputChange}
            />
            <TouchableOpacity onPress={handleInputSubmit}>
              <Text>OK</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>

      {/* Component beneath the first button */}
      <Animated.View style={[componentBeneathStyle, { marginTop: 20, backgroundColor: 'lightgray', padding: 10 }]}>
        <Text>This is the component beneath the first button.</Text>
      </Animated.View>
    </View>
  );
};

export default DropdownTextInput;
