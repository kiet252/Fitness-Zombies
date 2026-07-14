import {
View,
StyleSheet
} from "react-native";

import StatItem from "./StatItem";


type Stat={
icon:React.ReactNode;
value:string;
label:string;
};


type Props={
stats:Stat[];
};


export default function RunStatsPanel({
stats
}:Props){

return(
<View style={styles.panel}>

<View style={styles.row}>

{
stats.map((item,index)=>(
<StatItem
key={index}
{...item}
/>
))
}

</View>

</View>
);

}


const styles=StyleSheet.create({

panel:{
marginHorizontal:18,
paddingTop:17,
paddingBottom:14,
paddingHorizontal:15,
borderRadius:24,
backgroundColor:"rgba(7,13,18,.97)",
borderWidth:1,
borderColor:"#24303A"
},

row:{
flexDirection:"row",
justifyContent:"space-between"
}

});