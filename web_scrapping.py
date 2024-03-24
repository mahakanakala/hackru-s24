from bs4 import BeautifulSoup
import requests
import json

# Replace with your desired Pinterest board URL
board_url = "https://www.pinterest.com/karthikagurram/hackru/"

try:
    response = requests.get(board_url)
    response.raise_for_status()

    soup = BeautifulSoup(response.content, 'html.parser')
    link_list = []
    prdouc_list = []

    links = soup.find_all("a")
    for link in links:
        href = link.get("href")
        if href and href.startswith("/pin") and ('https://pinterest.com' + href) not in link_list:
            print("Link:", 'https://pinterest.com' + href)
            link_list.append('https://pinterest.com' + href)

    # Visit each link and grab every product link under "Shop the look" for each link
    for link in link_list:
        response = requests.get(link)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')
        shop_links = soup.select('a.productPinWrapper')
        print("Shop the look Links for", link)
        for shop_link in shop_links:
            shop_link_url = shop_link.get('href')
            print("Shop the look Link:", shop_link_url)
            # Visit the shop link and grab the product links
            response = requests.get(shop_link_url)
            response.raise_for_status()
            soup = BeautifulSoup(response.content, 'html.parser')
            product_links = soup.select('a.ProductPinExternalLink')
            for product_link in product_links:
                print("Product Link:", product_link.get('href'))
    json_data = json.dumps(link_list, indent=4)
    print(json_data)

except requests.exceptions.RequestException as e:
    print("An error occurred:", e)
