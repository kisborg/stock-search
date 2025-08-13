# Stock-search App

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

This app allows you to search for stocks based on their symbol or name.
While typing in the search bar you will get suggestions for stock. Clicking on the stock will open an Overview page where you will find detailed information such as company overview, financial information, stock preformance etc.

In addition you will be able to check the monthly price trends for the stock price.

On the Overview page you may add the selected stock as Favorite for easy access later by clicking on the star at the top-left corner of the Overview header.

The data is fetched from the Alpha Vantage Stock Market API. [https://www.alphavantage.co/](https://www.alphavantage.co/)

The app is deployed to Vercel at: [https://stock-search-weld.vercel.app/](https://stock-search-weld.vercel.app/)

#### Important!

The currently deployed app is using a free version of the Alpha Vantage API. The access token is limited to only 25 reguests/day.

## Getting Started

In your `.env` file add the following veriables:

```
API_URL=https://www.alphavantage.co
API_TOKEN={YOUR_API_ACCESS_TOKEN}
```

You may request a free access token here: [Request api key](https://www.alphavantage.co/support/#api-key)

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
