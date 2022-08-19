import { TouchableOpacity } from "react-native"
import { COMMON_STYLES } from "../../common/styles/commonStyles"
import { AntDesign } from '@expo/vector-icons';

const BackBtn = ({ navigation, routeToGo, color="white" }) => {
    const handleBack = () => {
        navigation.navigate(routeToGo)
    }

    return (
        <TouchableOpacity onPress={handleBack} style={[COMMON_STYLES.ROW, { marginTop: '10%' }]}>
            <AntDesign name="arrowleft" size={28} color={color} />
        </TouchableOpacity>
    )
}

export default BackBtn;