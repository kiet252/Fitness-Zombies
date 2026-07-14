import {
View,
Text,
StyleSheet
} from "react-native";

type Props={
icon:React.ReactNode;
value:string;
label:string;
};


export default function StatItem({
icon,
value,
label
}:Props){

return(
<View style={styles.container}>

{icon}

<Text style={styles.value}>
{value}
</Text>

<Text style={styles.label}>
{label}
</Text>

</View>
);

}


const styles=StyleSheet.create({

container:{
width:"24%",
alignItems:"center"
},

value:{
marginTop:4,
color:"#fff",
fontSize:13,
fontWeight:"800"
},

label:{
marginTop:6,
color:"#8B96A2",
fontSize:8,
fontWeight:"600",
letterSpacing:1
}

});