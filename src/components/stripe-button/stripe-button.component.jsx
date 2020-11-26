import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    'pk_test_51HrpmJGtjfOKL6pJUYOVM884Yt4p8KcepGAxbhaRN34KE9ohCM9UH6mQDDZqgGuJFbFu2ufRWL1MvsIXTCfEkY1G00MYio77ue';

  const onToken = (token) => {
    console.log(token);
    alert('Payment Successful');
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name=" FEEL GOOD CLOTHING"
      billingAddress
      shippingAddress
      image="https://sendeyo.com/up/d/f3eb2117da"
      description={`Your total is $${price}`} /* Actual dollar value */
      amount={priceForStripe}
      token={
        onToken
      } /* What happens when it is submitted, normally payment processed by passing token */
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
