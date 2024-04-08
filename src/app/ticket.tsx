import { useState } from "react";
import { StatusBar, Text, View, ScrollView, TouchableOpacity, Alert, Modal, Share } from "react-native";
import { MotiView } from "moti"
import {FontAwesome} from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import { useBadgeStore } from "@/store/badge-strore";
import { Redirect } from "expo-router";
import { Credential } from "@/components/credential";
import { Header } from "@/components/header";
import { colors } from "@/styles/colors";
import { Button } from "@/components/button";
import { QRCode } from "@/components/qrcode";

export default function Ticket(){

    
    const [expandQR, setExpandQR] = useState(false)
    const badgeStore = useBadgeStore()

    async function handleShare(){
        try {
            if(badgeStore.data?.checkInURL){
                await Share.share({
                    message: badgeStore.data?.checkInURL,
                })
            }
        } catch (error) {
            Alert.alert("Compartilhar", "Não foi possível compartilhar")
        }
    }

    async function handleSelectImage() {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4,4],
            })

            if(result.assets){
                badgeStore.updateAvatar(result.assets[0].uri)
            }

        } catch (error){
            Alert.alert("Foto", "Não foi possível tratar a imagem")
        }
    }

    if(!badgeStore.data?.checkInURL){
        return <Redirect href={"/"}/>
    }

    return(
        <View className="flex-1 bg-green-500">
            <StatusBar barStyle="light-content"/>
            <Header title="Minha Credencial"/>
            <ScrollView
                className="-mt-28 -z-10"
                contentContainerClassName="px-8 pb-8"
                showsVerticalScrollIndicator={false}
            >
                <Credential 
                    data={badgeStore.data}
                    onChangeAvatar={handleSelectImage}
                    onExpandQRCode={() => setExpandQR(true)}
                />
                <MotiView
                    from={{
                        translateY: 0
                    }}
                    animate={{
                        translateY: 10,
                    }}
                    transition={{
                        loop: true,
                        type: "timing",
                        duration: 500
                    }}
                >
                    <FontAwesome 
                        name="angle-double-down"
                        size={24}
                        color={colors.gray[300]}
                        className="self-center my-10"
                    />
                </MotiView>
                <Text className="text-white font-bold text-2xl my-4">
                    Compartilhar Credencial
                </Text>
                
                <Text className="text-white font-regular text-base mt-1 mb-6">
                    Mostre ao mundo que você vai participar do evento {badgeStore.data.eventTitle}!
                </Text>

                <Button title="Compartilhar" onPress={handleShare}/>

                <TouchableOpacity activeOpacity={0.7} onPress={() => badgeStore.remove()}>
                    <Text className="text-base text-white font-bold text-center m-8">Remover Ingressos</Text>
                </TouchableOpacity>
            </ScrollView>

            <Modal visible={expandQR} statusBarTranslucent animationType="fade">
                <View className="flex-1 bg-green-500 items-center justify-center">
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => setExpandQR(false)}
                    >
                        <QRCode value="teste" size={300}/>
                        <Text className="font-body text-orange-500 text-sm text-center mt-20">
                            Fechar
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>

        </View>
    )
}