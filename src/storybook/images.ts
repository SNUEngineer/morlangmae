export const profileImageUrls = [
  'https://upload3.inven.co.kr/upload/2020/03/26/bbs/i13564981007.jpg',
  'https://lh3.googleusercontent.com/proxy/pAhm3DWUImKCrqhYlXS-rsg5i7OYqn-mFQQ93beQ8Q6niwDwwyh2xa36zR8hfQ2me4Egm4Jdvzs_KsIvVvIHkzkyefyKSlRpnA32RCkAxOAOxHv-xRC-0UH0AOsuBCHiBwRUH0u9NelLd1K6AshYysVzNLTRfEv1R2tQ5YI_MIjs2dSAaG4XYc9nXWMTqu1BTxWs5GPArCI5dY4CPQfW-lAwAfUuAVCtse1jc12Ey7sjFEkyYWqZznk1A7PhjcmJ_aYuBl-m3rQzYwoj86PzNEpWVqYSAzcUSOjIBykziKIZIV0JoQQv',
  'https://mblogthumb-phinf.pstatic.net/MjAxOTA3MThfMTkz/MDAxNTYzNDE1NzA5NjA3.wIU4KoqqWFJEvKX9RaeAVeG_V2a-lnDjBhXYnIe8B_0g.B2Ym3Gcu-UCXmQVUrln8-aKGkSmozfwwxJlKEahRiBsg.PNG.b-seol/20190718_110757.png?type=w800',
]

export const backgorunImageUrls = [
  'https://picsum.photos/id/171/2048/1536',
]

export function profileImageUrl(): string {
  return profileImageUrls[Math.floor(Math.random() * profileImageUrls.length)]
}

export function backgroundImageUrl(): string {
  return backgorunImageUrls[Math.floor(Math.random() * backgorunImageUrls.length)]
}
