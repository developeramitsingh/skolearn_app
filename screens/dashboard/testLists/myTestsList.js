import { View, Text } from 'react-native';
import CardList from '../../../components/cardList/cardList';

import testListsStyles from './testListsStyles';
import * as Constant from '../../../constant/constant';
import { COMMON_STYLES } from '../../../common/styles/commonStyles';
import { useEffect, useState } from 'react';
import { enrolledTestsService } from '../../../services/index';
import Loader from '../../../components/loader/loader';


const MyTestsList = ({navigation})=> {
    const [myTestsList, setMyTestsList] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const getMyTestsList = async () => {
        try {
            console.info(`getMyTestsList called`);
            setLoading(true);
            const tests = await enrolledTestsService.getAllEnrolledTests();

            setLoading(false);
            if (tests?.data?.data) {
                setMyTestsList(tests.data.data);
                
            }
        } catch (err) {
            console.error(`error in getMyTestsList: ${err}`);
        }
    }

    useEffect(() => {
        getMyTestsList();
    }, []);
    
    const handleBtnPress = (id) => {
        console.info({id});
        navigation.navigate(Constant.ROUTES.RESULT_SCREEN, { testId: id });
    }
    return (
        <View style={testListsStyles.BACK_PANEL}>
            <Loader isLoading={isLoading}/>
            <Text style={testListsStyles.HEADING}>Test Completed</Text>
            <View style={[COMMON_STYLES.SEPARATOR, { marginHorizontal: 15 }]}></View>
            {
                myTestsList?.length 
                  ? <CardList handleBtnPress = {handleBtnPress} customStyle={{ flex: 1 }} dataList={myTestsList} horizontal = {false}/>
                  : <Text style= {[COMMON_STYLES.BODY_TEXT, { marginTop: 10, textAlign: 'center'}]}>No Test Appeared, Please attempt the test</Text>
            }
            
        </View>
    )   
}

export default MyTestsList;