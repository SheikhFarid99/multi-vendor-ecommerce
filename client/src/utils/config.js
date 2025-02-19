const stripe_sky = 'pk_test_51Nk8Y4F0B89ncn3xWB6ZN3GsbVIVL7Jqfa3jxtIOpPkKHcleHZw4EMPJKd4cRwm34ZARBeYmAWwu3VxyYL1gb6OT00UKNSvfvb'


const production = 'production'
const dev = 'development'

const mode = production

let app_url, api_url

if (mode === production) {
    app_url = "https://shopmy-cyan.vercel.app"
    api_url = "https://api-ecommerce-fos4.onrender.com"
} else {
    app_url = 'http://localhost:3000'
    api_url = 'http://localhost:5000'
}

export {
    app_url,
    api_url,
    stripe_sky
}