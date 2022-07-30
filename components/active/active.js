import { StyleSheet, View } from 'react-native';
import { APP_COLORS } from '../../constant/constant';


const activeStyle = StyleSheet.create({
    activeDot: {
        width: 10,
        height: 10,
        borderRadius: 50,
        marginHorizontal: 10,
    },
    active: {
        backgroundColor: APP_COLORS.green,
    },
    inactive: {
        backgroundColor: 'red',
    }

});

const Active = ({isActive}) => {
    return (
        <View style={ [activeStyle.activeDot, isActive ? activeStyle.active : activeStyle.inactive]}>
        </View>
    )
};

export default Active;