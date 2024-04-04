import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps &{
    title: string
    isLoading?: boolean
}

export function Button({title, isLoading = false, ...rest }: Props){
    return(
        <TouchableOpacity disabled={isLoading} activeOpacity={0.7} {...rest}>
            {
             isLoading ? (<ActivityIndicator className="w-full h-14 p-4 text-center bg-orange-500 text-green-500 font-bold uppercase rounded-lg"/>) :     
                
            <Text className="w-full h-14 p-4 text-center bg-orange-500 text-green-500 font-bold uppercase rounded-lg">
                {title}
            </Text>}
        </TouchableOpacity>
    )
}