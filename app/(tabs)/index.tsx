import { ActivityIndicator, StyleSheet } from 'react-native';

import { useEffect, useState } from 'react';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { StatusBar } from 'expo-status-bar';

interface ApiResponse {
  time: {
    updated: string;
    updatedISO: string;
    updateduk: string;
  };
  disclaimer: string;
  chartName: string;
  bpi: {
    USD: {
      code: string;
      symbol: string;
      rate: string;
      description: string;
      rate_float: number;
    };
    GBP: {
      code: string;
      symbol: string;
      rate: string;
      description: string;
      rate_float: number;
    };
    EUR: {
      code: string;
      symbol: string;
      rate: string;
      description: string;
      rate_float: number;
    };
  };
}


export default function TabOneScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [response, setResponse] = useState<ApiResponse | undefined>(undefined);



  useEffect(() => {
    fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
    .then(res => res.json())
    .then(
      (result) => {
        setIsLoading(false);
        setResponse(result);
      },
      (error) => {
        setIsLoading(false);
        setError(error);
      }
    )
    }, []);

  const getContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" color="#0000ff" />
    }

    if (error) {
      return <Text>Error: {error}</Text>
    }

    if (!response) {
      return <Text>No data</Text>
    }

    console.log(response);
    
    // Access the rate property from the USD object
    const usdRate = response.bpi.USD.rate;
    const usdRateFloat = response.bpi.EUR.rate;

    return (
      <View>
        <Text>Bitcoin (USD): {usdRate}</Text>
        <Text>Bitcoin (EURO) : {usdRateFloat}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {getContent()}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
