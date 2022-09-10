import { TouchableOpacity } from "react-native"
import { COMMON_STYLES } from "../../common/styles/commonStyles"
import { AntDesign } from '@expo/vector-icons';

const BackBtn = ({ navigation, routeToGo, color="white", handler }) => {
    const handleBack = () => {
        navigation.navigate(routeToGo)
    }

    return (
        <TouchableOpacity onPress={handler ? handler : handleBack} style={COMMON_STYLES.ROW}>
            <AntDesign name="arrowleft" size={28} color={color} />
        </TouchableOpacity>
    )
}

export default BackBtn;