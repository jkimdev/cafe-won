import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { firebaseConfig } from '../../firebase-config.ts';

const menuData = [
  {"id":"americano","name":"아메리카노","nameEn":"Americano","description":"깔끔하고 진한 에스프레소","price":"2500","category":"coffee","image":"/images/americano.jpg","isAvailable":"True","order":"1","options":[{"id":"hot_iced","name":"HOT/ICED","type":"hot_iced","choices":[{"id":"hot","name":"HOT","price":"0"},{"id":"iced","name":"ICED","price":"0"}]},{"id":"shot","name":"샷 추가","type":"shot","choices":[{"id":"extra","name":"샷 추가","price":"500"}]}]},
  {"id":"caffe_latte","name":"카페라떼","nameEn":"Caffe Latte","description":"","price":"3300","category":"coffee","image":"/images/caffe_latte.jpg","isAvailable":"True","order":"2","options":[{"id":"hot_iced","name":"HOT/ICED","type":"hot_iced","choices":[{"id":"hot","name":"HOT","price":"0"},{"id":"iced","name":"ICED","price":"0"}]},{"id":"shot","name":"샷 추가","type":"shot","choices":[{"id":"extra","name":"샷 추가","price":"500"}]}]},
  {"id":"cappuccino","name":"카푸치노","nameEn":"Cappuccino","description":"","price":"3300","category":"coffee","image":"/images/cappuccino.jpg","isAvailable":"True","order":"3","options":[{"id":"hot_iced","name":"HOT/ICED","type":"hot_iced","choices":[{"id":"hot","name":"HOT","price":"0"},{"id":"iced","name":"ICED","price":"0"}]},{"id":"shot","name":"샷 추가","type":"shot","choices":[{"id":"extra","name":"샷 추가","price":"500"}]}]},
  {"id":"vanilla_latte","name":"바닐라라떼","nameEn":"Vanilla Latte","description":"","price":"3500","category":"coffee","image":"/images/vanilla_latte.jpg","isAvailable":"True","order":"4","options":[{"id":"hot_iced","name":"HOT/ICED","type":"hot_iced","choices":[{"id":"hot","name":"HOT","price":"0"},{"id":"iced","name":"ICED","price":"0"}]},{"id":"shot","name":"샷 추가","type":"shot","choices":[{"id":"extra","name":"샷 추가","price":"500"}]}]},
  {"id":"hazelnut_latte","name":"헤이즐넛라떼","nameEn":"Hazelnut Latte","description":"","price":"3500","category":"coffee","image":"/images/hazelnut_latte.jpg","isAvailable":"True","order":"5","options":[{"id":"hot_iced","name":"HOT/ICED","type":"hot_iced","choices":[{"id":"hot","name":"HOT","price":"0"},{"id":"iced","name":"ICED","price":"0"}]},{"id":"shot","name":"샷 추가","type":"shot","choices":[{"id":"extra","name":"샷 추가","price":"500"}]}]},
  {"id":"caramel_macchiato","name":"카라멜마끼아또","nameEn":"Caramel Macchiato","description":"","price":"4000","category":"coffee","image":"/images/caramel_macchiato.jpg","isAvailable":"True","order":"6","options":[{"id":"hot_iced","name":"HOT/ICED","type":"hot_iced","choices":[{"id":"hot","name":"HOT","price":"0"},{"id":"iced","name":"ICED","price":"0"}]},{"id":"shot","name":"샷 추가","type":"shot","choices":[{"id":"extra","name":"샷 추가","price":"500"}]}]},
  {"id":"caffe_mocha","name":"카페모카","nameEn":"Caffe Mocha","description":"","price":"4000","category":"coffee","image":"/images/caffe_mocha.jpg","isAvailable":"True","order":"7","options":[{"id":"hot_iced","name":"HOT/ICED","type":"hot_iced","choices":[{"id":"hot","name":"HOT","price":"0"},{"id":"iced","name":"ICED","price":"0"}]},{"id":"shot","name":"샷 추가","type":"shot","choices":[{"id":"extra","name":"샷 추가","price":"500"}]}]},
  {"id":"choco_latte","name":"초코라떼","nameEn":"Choco Latte","description":"","price":"4000","category":"non_coffee","image":"/images/choco_green_tea_latte.jpg","isAvailable":"True","order":"8","options":[{"id":"hot_iced","name":"HOT/ICED","type":"hot_iced","choices":[{"id":"hot","name":"HOT","price":"0"},{"id":"iced","name":"ICED","price":"0"}]},{"id":"whipped_cream","name":"휘핑크림","type":"whipped_cream","choices":[{"id":"whipped_cream","name":"휘핑크림","price":"0"}]}]},
  {"id":"choco_green_tea_latte","name":"녹차라떼","nameEn":"Green Tea Latte","description":"","price":"4000","category":"non_coffee","image":"/images/choco_green_tea_latte.jpg","isAvailable":"True","order":"9","options":[{"id":"hot_iced","name":"HOT/ICED","type":"hot_iced","choices":[{"id":"hot","name":"HOT","price":"0"},{"id":"iced","name":"ICED","price":"0"}]},{"id":"whipped_cream","name":"휘핑크림","type":"whipped_cream","choices":[{"id":"whipped_cream","name":"휘핑크림","price":"0"}]}]},
  {"id":"milk_tea","name":"밀크티(홍차라떼)","nameEn":"Milk Tea","description":"","price":"3500","category":"non_coffee","image":"/images/milk_tea.jpg","isAvailable":"True","order":"10","options":[{"id":"hot_iced","name":"HOT/ICED","type":"hot_iced","choices":[{"id":"hot","name":"HOT","price":"0"},{"id":"iced","name":"ICED","price":"0"}]}]},
  {"id":"sweet_potato_latte","name":"고구마라떼","nameEn":"Sweet Potato Latte","description":"","price":"4000","category":"non_coffee","image":"/images/sweet_potato_latte.jpg","isAvailable":"True","order":"11","options":[{"id":"hot_iced","name":"HOT/ICED","type":"hot_iced","choices":[{"id":"hot","name":"HOT","price":"0"},{"id":"iced","name":"ICED","price":"0"}]}]},
  {"id":"strawberry_latte","name":"딸기라떼","nameEn":"Strawberry Latte","description":"","price":"4000","category":"non_coffee","image":"/images/strawberry_latte.jpg","isAvailable":"True","order":"12","options":[{"id":"hot_iced","name":"HOT/ICED","type":"hot_iced","choices":[{"id":"hot","name":"HOT","price":"0"},{"id":"iced","name":"ICED","price":"0"}]},{"id":"whipped_cream","name":"휘핑크림","type":"whipped_cream","choices":[{"id":"whipped_cream","name":"휘핑크림","price":"0"}]}]},
  {"id":"lemon_tea","name":"레몬차","nameEn":"Lemon Tea","description":"","price":"4000","category":"hand_made_tea","image":"/images/lemon_tea.jpg","isAvailable":"True","order":"13","options":[{"id":"hot_iced","name":"HOT/ICED","type":"hot_iced","choices":[{"id":"hot","name":"HOT","price":"0"},{"id":"iced","name":"ICED","price":"0"}]}]},
  {"id":"grapefruit_tea","name":"자몽차","nameEn":"Grapefruit Tea","description":"","price":"4000","category":"hand_made_tea","image":"/images/grapefruit_tea.jpg","isAvailable":"True","order":"14","options":[{"id":"hot_iced","name":"HOT/ICED","type":"hot_iced","choices":[{"id":"hot","name":"HOT","price":"0"},{"id":"iced","name":"ICED","price":"0"}]}]},
  {"id":"citron_tea","name":"유자차","nameEn":"Citron Tea","description":"","price":"4000","category":"hand_made_tea","image":"/images/citron_tea.jpg","isAvailable":"True","order":"15","options":[{"id":"hot_iced","name":"HOT/ICED","type":"hot_iced","choices":[{"id":"hot","name":"HOT","price":"0"},{"id":"iced","name":"ICED","price":"0"}]}]},
  {"id":"lemon_ade","name":"레몬에이드","nameEn":"Lemon Ade","description":"","price":"3500","category":"ade","image":"/images/lemon_ade.jpg","isAvailable":"True","order":"16","options":[{"id":"hot_iced","name":"HOT/ICED","type":"hot_iced","choices":[{"id":"iced","name":"ICED","price":"0"}]}]},
  {"id":"grapefruit_ade","name":"자몽에이드","nameEn":"Grapefruit Ade","description":"","price":"3500","category":"ade","image":"/images/grapefruit_ade.jpg","isAvailable":"True","order":"17","options":[{"id":"hot_iced","name":"HOT/ICED","type":"hot_iced","choices":[{"id":"iced","name":"ICED","price":"0"}]}]},
  {"id":"green_grape_ade","name":"청포도에이드","nameEn":"Green Grape Ade","description":"","price":"4000","category":"ade","image":"/images/green_grape_ade.jpg","isAvailable":"True","order":"18","options":[{"id":"hot_iced","name":"HOT/ICED","type":"hot_iced","choices":[{"id":"iced","name":"ICED","price":"0"}]}]},
  {"id":"yogurt_frappe","name":"요거트프라페","nameEn":"Yogurt Frappe","description":"","price":"3900","category":"frappe_juice","image":"/images/yogurt_frappe.jpg","isAvailable":"True","order":"19","options":[{"id":"hot_iced","name":"HOT/ICED","type":"hot_iced","choices":[{"id":"iced","name":"ICED","price":"0"}]}]},
  {"id":"strawberry_yogurt_frappe","name":"딸기요거트프라페","nameEn":"Strawberry Yogurt Frappe","description":"","price":"4200","category":"frappe_juice","image":"/images/strawberry_yogurt_frappe.jpg","isAvailable":"True","order":"20","options":[{"id":"hot_iced","name":"HOT/ICED","type":"hot_iced","choices":[{"id":"iced","name":"ICED","price":"0"}]}]},
  {"id":"choripong_latte","name":"쵸리퐁라떼","nameEn":"Choripong Latte","description":"","price":"4800","category":"frappe_juice","image":"/images/choripong_latte.jpg","isAvailable":"True","order":"21","options":[{"id":"hot_iced","name":"HOT/ICED","type":"hot_iced","choices":[{"id":"iced","name":"ICED","price":"0"}]}]},
  {"id":"oreo_frappe","name":"오레오프라페","nameEn":"Oreo Frappe","description":"","price":"4800","category":"frappe_juice","image":"/images/oreo_frappe.jpg","isAvailable":"True","order":"22","options":[{"id":"iced","name":"ICED","price":"0"},{"id":"whipped_cream","name":"휘핑크림","type":"whipped_cream","choices":[{"id":"whipped_cream","name":"휘핑크림","price":"0"}]}]},
  {"id":"blueberry_yogurt_frappe","name":"블루베리요거트프라페","nameEn":"Blueberry Yogurt Frappe","description":"","price":"5000","category":"frappe_juice","image":"/images/blueberry_yogurt_frappe.jpg","isAvailable":"True","order":"23","options":[{"id":"hot_iced","name":"HOT/ICED","type":"hot_iced","choices":[{"id":"iced","name":"ICED","price":"0"}]}]},
  {"id":"watermelon_juice","name":"수박주스","nameEn":"Watermelon Juice","description":"","price":"4500","category":"frappe_juice","image":"/images/watermelon_juice.jpg","isAvailable":"True","order":"24","options":[{"id":"hot_iced","name":"HOT/ICED","type":"hot_iced","choices":[{"id":"iced","name":"ICED","price":"0"}]}]},
  {"id":"chamomile","name":"캐모마일","nameEn":"Chamomile","description":"","price":"3000","category":"organic_tea","image":"/images/chamomile.jpg","isAvailable":"True","order":"25","options":[{"id":"hot_iced","name":"HOT/ICED","type":"hot_iced","choices":[{"id":"hot","name":"HOT","price":"0"},{"id":"iced","name":"ICED","price":"0"}]}]},
  {"id":"peppermint","name":"페퍼민트","nameEn":"Peppermint","description":"","price":"3000","category":"organic_tea","image":"/images/peppermint.jpg","isAvailable":"True","order":"26","options":[{"id":"hot_iced","name":"HOT/ICED","type":"hot_iced","choices":[{"id":"hot","name":"HOT","price":"0"},{"id":"iced","name":"ICED","price":"0"}]}]},
  {"id":"earl_grey","name":"얼그레이","nameEn":"Earl Grey","description":"","price":"3000","category":"organic_tea","image":"/images/earl_grey.jpg","isAvailable":"True","order":"27","options":[{"id":"hot_iced","name":"HOT/ICED","type":"hot_iced","choices":[{"id":"hot","name":"HOT","price":"0"},{"id":"iced","name":"ICED","price":"0"}]}]},
  {"id":"lemon_hibiscus","name":"레몬히비스커스","nameEn":"Lemon Hibiscus","description":"","price":"4000","category":"organic_tea","image":"/images/lemon_hibiscus.jpg","isAvailable":"True","order":"28","options":[{"id":"hot_iced","name":"HOT/ICED","type":"hot_iced","choices":[{"id":"hot","name":"HOT","price":"0"},{"id":"iced","name":"ICED","price":"0"}]}]},
  {"id":"peach_iced_tea","name":"복숭아 아이스티","nameEn":"Peach Iced Tea","description":"","price":"3000","category":"iced_tea","image":"/images/peach_iced_tea.jpg","isAvailable":"True","order":"29","options":[{"id":"hot_iced","name":"HOT/ICED","type":"hot_iced","choices":[{"id":"iced","name":"ICED","price":"0"}]}]},
  {"id":"calamansi_iced_tea","name":"깔라만시 아이스티","nameEn":"Calamansi Iced Tea","description":"","price":"3000","category":"iced_tea","image":"/images/calamansi_iced_tea.jpg","isAvailable":"True","order":"30","options":[{"id":"hot_iced","name":"HOT/ICED","type":"hot_iced","choices":[{"id":"iced","name":"ICED","price":"0"}]}]}
];

// Swap HOT and ICED order in all 'hot_iced' options and add order property
menuData.forEach(item => {
  if (item.options) {
    item.options.forEach(option => {
      if (option.type === 'hot_iced' && Array.isArray(option.choices)) {
        option.choices.forEach(choice => {
          if (choice.id === 'iced') (choice as any).order = 1;
          else if (choice.id === 'hot') (choice as any).order = 2;
        });
        option.choices.sort((a, b) => ((a as any).order || 0) - ((b as any).order || 0));
      }
    });
  }
});

function convertMenuItem(item: any) {
  const base = {
    ...item,
    price: Number(item.price),
    isAvailable: item.isAvailable === 'True' || item.isAvailable === true,
    order: Number(item.order),
  };
  if (item.options && Array.isArray(item.options) && item.options.length > 0) {
    return {
      ...base,
      options: item.options.map((opt: any) => ({
        ...opt,
        choices: opt.choices?.map((choice: any) => ({
          ...choice,
          price: Number(choice.price)
        })) || []
      }))
    };
  } else {
    return base;
  }
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function uploadMenu() {
  const menuCol = collection(db, 'menu');
  const existingDocs = await getDocs(menuCol);
  const existingIds = new Set(existingDocs.docs.map(doc => doc.data().id));

  for (const item of menuData) {
    if (existingIds.has(item.id)) {
      console.log(`Skip: ${item.id} already exists.`);
      continue;
    }
    const menuItem = convertMenuItem(item);
    await addDoc(menuCol, menuItem);
    console.log(`Uploaded: ${menuItem.id}`);
  }
  console.log('Upload complete.');
}

uploadMenu().catch(console.error); 