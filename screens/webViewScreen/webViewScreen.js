import { WebView } from 'react-native-webview';
import { COMMON_STYLES } from '../../common/styles/commonStyles';
import { View, BackHandler } from 'react-native';
import { APP_COLORS, ROUTES, STORAGE_KEYS } from '../../constant/constant';
import BackBtn from '../../components/backBtn/backBtn';
import { useEffect, useState } from 'react';
import { getFromStorage } from '../../utils/utils';

const WebViewScreen = ({ navigation, route}) => {
    const [routeToGo, setRoute] = useState(null);
    useEffect(() => {
        (async ()=> {
            const USER_TOKEN = await getFromStorage(STORAGE_KEYS.USER_TOKEN);

            if (USER_TOKEN) {
                setRoute(ROUTES.DASHBOARD);
            } else {
                setRoute(ROUTES.REGISTER);
            }
        })()
    }, []);

    useEffect(()=> {
        const backAction = async () => {
            console.info(`backAction called in result screen`);
            const USER_TOKEN = await getFromStorage(STORAGE_KEYS.USER_TOKEN);

            console.info({USER_TOKEN});

            if (USER_TOKEN) {
                navigation.goBack();
            } else {
                navigation.navigate(ROUTES.REGISTER);
            }
            
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
            <BackBtn color={APP_COLORS.appThemeColor} navigation={navigation} routeToGo={routeToGo}/>
            <WebView 
                source={{ uri: route?.params?.webViewUrl }}
            />    
        </View>
    )
};

export default WebViewScreen;