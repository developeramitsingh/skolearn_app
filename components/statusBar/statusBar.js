import { View, BackHandler, Alert, Image } from 'react-native';
import statusBarStyles from './statusBarStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ROUTES } from '../../constant/constant';
import { useEffect, useState } from 'react';
import * as Constant from  '../../constant/constant';
import Drawer from '../../components/drawer/drawer';


const StatusBar = ({ navigation, isNewNotifi }) => {
    const [state, setState] = useState({
        userName: 'Test user',
        profileImg: false,
    });

    const [isDrawerOpen, setDrawer] = useState(false);

    useEffect(() => {
        const backAction = () => {
            setDrawer(false);
            return true;
          };
      
          const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
          );
      
          return () => backHandler.remove();

    }, [isNewNotifi]);

    const handlePress = (actionType) => {
        if (actionType === 'openDrawer') {
            setDrawer(true);
        } else if (actionType === Constant.ACTION_TYPES.OPEN_NOTIFI) {
            navigation.navigate(ROUTES.NOTIFICATION);
        }
    }
    return (
        <>
            {
                isDrawerOpen ?
                <Drawer setDrawer={setDrawer} userName={state.userName}/>
                : null
            }

        <View style={statusBarStyles.SUB_CONT}>
            <Image source={{ uri: Constant.ASSEST_URLS.LOGO }} style={{height: 32, width: 100, borderRadius: 10}}/>

            <View style={statusBarStyles.ROW}>
                {
                    isNewNotifi 
                        ? <MaterialCommunityIcons style={{ marginLeft: 10 }} onPress={()=> handlePress(Constant.ACTION_TYPES.OPEN_NOTIFI)}  name="bell-badge" size={26} color={Constant.APP_COLORS.yellow}/>
                        : <MaterialCommunityIcons style={{ marginLeft: 10 }} onPress={()=> handlePress(Constant.ACTION_TYPES.OPEN_NOTIFI)}  name="bell" size={26} color={Constant.APP_COLORS.white}/>
               }
                <MaterialCommunityIcons onPress={()=> handlePress('openDrawer')} name="account-details" size={30} color="white"/>
               
            </View>
        </View>
        </>
    )
}

export default StatusBar;