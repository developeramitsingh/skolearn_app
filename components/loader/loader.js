import { ActivityIndicator, View } from "react-native"
import { COMMON_STYLES } from "../../common/styles/commonStyles"
import { APP_COLORS } from "../../constant/constant"

const Loader = ({ isLoading }) => {
    return (
        <>
            {
                isLoading &&
                <View style={COMMON_STYLES.LOADER_CONT}>
                    <ActivityIndicator animating={true} size="large" color={APP_COLORS.yellow} />
                </View>
            }
        </>
    )
}

export default Loader;