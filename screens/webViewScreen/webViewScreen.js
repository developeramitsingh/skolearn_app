import { WebView } from 'react-native-webview';
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import { View, BackHandler } from 'react-native';
import { APP_COLORS, ROUTES } from '../../constant/constant';
import BackBtn from '../../components/backBtn/backBtn';
import { useEffect } from 'react';

const WebViewScreen = ({ navigation, route}) => {
    useEffect(()=> {
        const backAction = () => {
            console.info(`backAction called in result screen`);
            navigation.navigate(ROUTES.DASHBOARD);
            return true;
          };
      
          const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
          );
      
          return () => backHandler.remove();
    }, []);

    return (
        <View style={COMMON_STYLES.CONTAINER_LIGHT}>
            <BackBtn color={APP_COLORS.appThemeColor} navigation={navigation} routeToGo={ROUTES.DASHBOARD}/>
            <WebView 
                source={{ uri: route?.params?.webViewUrl }}
            />    
        </View>
    )
};

export default WebViewScreen;