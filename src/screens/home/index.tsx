import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';
import { NavigationProps } from '../../types/navigation';

const Home = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <View className="justify-center items-center flex-1 bg-yellow-200">
      <Text className="text-6xl font-bold">Hello Home</Text>
      <TouchableOpacity
        className="bg-blue-500 p-2 rounded-lg mt-4"
        onPress={() => navigation.navigate('Cash')}
      >
        <Text className="text-white m-5 text-2xl">Go to Cash</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
