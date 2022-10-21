import { SECRET_KEY} from "../../../backend/env.vars";
import { StripeProvider } from '@stripe/stripe-react-native';
import  "../../../backend/server";
import { sendEmail } from "../../navigation/functions";
import {publishable_Key} from "../../../backend/env.vars"

//function App() {
  //return (
   // <StripeProvider
    //  publishableKey="pk_test_51LuZiZIqy9XhZJhS1a0vIsgYPgsLSxQxh1B9Tb5DCKrWsRELMTJgKkb3qXG51cYzZniNR1NOi0NG0feoQzbtB7id0018i1wa3C"
     // urlScheme="your-url-scheme" // Your url scheme required for 3D Secure and bank redirects
     // merchantIdentifier="merchant.com.{{Bulky}}" // App name required for Apple Pay
   // >
      
    //</StripeProvider>
 // );
//}

//const paymentLink = await stripe.paymentLinks.create({
  //line_items: [{price: '{{PRICE_ID}}', quantity: 1}],
  //after_completion: {type: 'redirect', redirect: {}}},

  

export default function CheckoutScreen() {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
  
    const fetchPaymentSheetParams = async () => {
      const response = await fetch(`${API_URL}/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { paymentIntent, ephemeralKey, customer} = await response.json();
  
      return {
        paymentIntent,
        ephemeralKey,
        customer,
      };
    };
  
    const initializePaymentSheet = async () => {
      const {
        paymentIntent,
        ephemeralKey,
        customer,
        publishable_Key,
      } = await fetchPaymentSheetParams();
  
      const { error } = await initPaymentSheet({
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        allowsDelayedPaymentMethods: true,
      });
      if (!error) {
        setLoading(true);
      }
    };
  
    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();

        if (error) {
          Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
          Alert.alert('Success', 'Your order is confirmed!');
        }
    };
  
    useEffect(() => {
      initializePaymentSheet();
    }, []);
  
    return (
      <StripeProvider>
      <Screen>
        <Button
          variant="primary"
          disabled={!loading}
          title="Checkout"
          onPress={openPaymentSheet}
        />
      </Screen>
      </StripeProvider>
      

    );
  }