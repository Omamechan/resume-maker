let state = { user_name: "", summary: "", cards: [], licenses: [], activeIndex: 0, activeTab: 'job' };
let isPreviewMode = false;
let resetModalObj = null;

const embeddedLicenseMaster = {
  "自動車・運転免許": ["普通自動車第一種運転免許", "普通自動車第二種運転免許", "大型自動車第一種運転免許", "フォークリフト運転技能講習", "中型自動車免許"],
  "IT・情報処理・Web": ["基本情報技術者試験", "応用情報技術者試験", "ITパスポート試験", "情報処理安全確保支援士", "AWS Certified Solutions Architect", "HTML5プロフェッショナル認定"],
  "事務・会計・語学": ["TOEIC L&R", "実用英語技能検定", "日商簿記検定 1級", "日商簿記検定 2級", "日商簿記検定 3級", "秘書技能検定", "ファイナンシャル・プランナー（FP）"],
  "技術・建築・不動産": ["第一種電気工事士", "第二種電気工事士", "宅地建物取引士（宅建）", "1級建築士", "2級建築士", "危険物取扱者 乙種4類", "1級土木施工管理技士"],
  "医療・福祉・飲食": ["介護福祉士", "社会福祉士", "看護師", "登録販売者", "調理師", "食品衛生責任者"],
  "★ リストにない資格（直接入力）": ["直接入力"]
};

const jobData = {
  "営業・販売系": [
    "法人営業",
    "個人営業",
    "ルート営業",
    "インサイドセールス",
    "営業事務・営業アシスタント",
    "販売スタッフ",
    "店長・店舗運営",
    "その他"
  ],

  "事務・企画・管理系": [
    "一般事務",
    "営業事務",
    "受付・案内",
    "人事・採用",
    "労務",
    "総務",
    "経理・財務",
    "法務",
    "経営企画・事業企画",
    "マーケティング・広報",
    "その他"
  ],

  "接客・サービス・飲食系": [
    "飲食店スタッフ",
    "ホールスタッフ",
    "調理・キッチンスタッフ",
    "コンビニ・スーパー",
    "ホテル・宿泊スタッフ",
    "カスタマーサポート",
    "コールセンター",
    "その他"
  ],

  "IT・Web系": [
    "Webエンジニア・プログラマー",
    "システムエンジニア（SE）",
    "インフラエンジニア",
    "社内SE",
    "ITサポート・ヘルプデスク",
    "データサイエンティスト",
    "Web運用・更新",
    "その他"
  ],

  "クリエイティブ系": [
    "Webデザイナー",
    "グラフィックデザイナー",
    "映像編集",
    "ライター・編集",
    "写真・撮影",
    "その他"
  ],

  "製造・物流・技術系": [
    "製造・組立",
    "検品・品質管理",
    "倉庫・仕分け",
    "物流・配送",
    "機械・電気設計",
    "施工管理",
    "保守・メンテナンス",
    "その他"
  ],

  "医療・福祉系": [
    "看護師",
    "介護職",
    "医療事務",
    "調剤事務",
    "医療技術職",
    "福祉・生活支援",
    "その他"
  ],

  "教育・保育系": [
    "教員・講師",
    "塾講師・家庭教師",
    "保育士",
    "学童・児童支援",
    "その他"
  ],

  "美容・生活サービス系": [
    "美容師・理容師",
    "エステ・美容スタッフ",
    "清掃",
    "警備",
    "その他"
  ],

  "専門職": [
    "コンサルタント",
    "研究・開発",
    "不動産関連",
    "金融・保険関連",
    "その他"
  ],

  "公務員": [
    "国家公務員",
    "地方公務員",
    "その他"
  ],

  "その他": [
    "その他"
  ]
};

const detailTaskData = {
  // 営業・販売系
  "法人営業": [
    "新規顧客開拓",
    "既存顧客フォロー",
    "商談・ヒアリング",
    "提案書・見積書作成",
    "契約・価格交渉",
    "売上・KPI管理",
    "その他"
  ],

  "販売スタッフ": [
    "接客・商品案内",
    "レジ・会計",
    "品出し・商品陳列",
    "在庫管理",
    "売場づくり",
    "問い合わせ対応",
    "その他"
  ],

  "店長・店舗運営": [
    "店舗運営",
    "売上管理",
    "在庫・発注管理",
    "シフト作成",
    "スタッフ教育",
    "クレーム対応",
    "その他"
  ],

  // 事務・企画・管理系
  "一般事務": [
    "データ入力",
    "書類・資料作成",
    "電話・メール対応",
    "ファイリング",
    "データ集計",
    "社内外との調整",
    "その他"
  ],

  "営業事務": [
    "受発注処理",
    "見積書・請求書作成",
    "納期調整",
    "営業資料作成",
    "顧客対応",
    "営業担当者のサポート",
    "その他"
  ],

  "受付・案内": [
    "来客受付",
    "電話対応",
    "施設・サービス案内",
    "予約管理",
    "問い合わせ対応",
    "その他"
  ],

  "人事・採用": [
    "応募者対応",
    "面接日程調整",
    "求人票作成・管理",
    "入退社手続き",
    "採用進捗管理",
    "研修・教育支援",
    "その他"
  ],

  "経理・財務": [
    "伝票処理",
    "請求書処理",
    "入出金管理",
    "経費精算",
    "仕訳入力",
    "月次・年次決算補助",
    "その他"
  ],

  // 接客・サービス・飲食系
  "飲食店スタッフ": [
    "接客・案内",
    "注文受付",
    "配膳・提供",
    "レジ・会計",
    "清掃",
    "新人教育",
    "その他"
  ],

  "ホールスタッフ": [
    "お客様の案内",
    "注文受付",
    "料理・飲料の提供",
    "レジ・会計",
    "テーブル片付け・清掃",
    "その他"
  ],

  "調理・キッチンスタッフ": [
    "仕込み",
    "調理・調理補助",
    "盛り付け",
    "食材管理",
    "衛生管理",
    "清掃",
    "その他"
  ],

  "コンビニ・スーパー": [
    "レジ対応",
    "品出し・商品陳列",
    "在庫確認",
    "発注",
    "店内清掃",
    "お客様対応",
    "その他"
  ],

  "コールセンター": [
    "電話受付",
    "問い合わせ対応",
    "商品・サービス案内",
    "対応履歴入力",
    "クレーム一次対応",
    "その他"
  ],

  // IT・Web系
  "Webエンジニア・プログラマー": [
    "要件確認",
    "プログラム開発",
    "テスト・デバッグ",
    "コード修正",
    "運用・保守",
    "その他"
  ],

  "システムエンジニア（SE）": [
    "要件定義",
    "基本・詳細設計",
    "開発管理",
    "テスト",
    "導入支援",
    "運用・保守",
    "その他"
  ],

  "インフラエンジニア": [
    "サーバー構築・運用",
    "ネットワーク構築・運用",
    "監視・障害対応",
    "アカウント管理",
    "セキュリティ対応",
    "その他"
  ],

  "社内SE": [
    "社内問い合わせ対応",
    "PC・アカウント管理",
    "IT資産管理",
    "システム導入・運用",
    "業務改善・自動化",
    "ベンダー調整",
    "その他"
  ],

  "ITサポート・ヘルプデスク": [
    "問い合わせ対応",
    "PC初期設定",
    "アカウント設定",
    "トラブル対応",
    "操作説明",
    "対応履歴管理",
    "その他"
  ],

  // 製造・物流・技術系
  "製造・組立": [
    "製品組立",
    "機械操作",
    "部品準備",
    "検品",
    "工程確認",
    "安全・5S活動",
    "その他"
  ],

  "検品・品質管理": [
    "受入検査・出荷検査",
    "製品検品",
    "不具合解析・再発防止",
    "品質データ管理",
    "ISO運用・監査対応",
    "品質改善活動",
    "その他"
  ],

  "倉庫・仕分け": [
    "仕分け",
    "ピッキング",
    "梱包",
    "入出荷作業",
    "在庫管理",
    "棚卸",
    "その他"
  ],

  "機械・電気設計": [
    "製品・設備設計",
    "CAD図面作成",
    "試作・評価",
    "仕様書作成",
    "設計変更・改善",
    "その他"
  ],

  "施工管理": [
    "工程管理・日程調整",
    "安全衛生管理",
    "施工図チェック",
    "品質管理",
    "予算・原価管理",
    "協力会社との調整",
    "その他"
  ],

  // 医療・福祉系
  "医療事務": [
    "受付・患者対応",
    "会計",
    "レセプト業務",
    "電話対応",
    "カルテ・書類管理",
    "その他"
  ],

  "介護職": [
    "身体介助",
    "生活援助",
    "レクリエーション",
    "介護記録作成",
    "利用者・家族対応",
    "その他"
  ],

  // 教育・保育系
  "塾講師・家庭教師": [
    "個別・集団指導",
    "教材準備",
    "学習進捗管理",
    "質問対応",
    "保護者対応",
    "その他"
  ],

  "保育士": [
    "保育・見守り",
    "生活支援",
    "行事準備・運営",
    "保護者対応",
    "保育記録作成",
    "その他"
  ]
};

const taskData = {
  "営業・販売系": [
    "新規開拓営業",
    "既存顧客・ルート営業",
    "商談・提案",
    "見積書・提案書作成",
    "顧客フォロー",
    "販売・接客",
    "レジ対応",
    "商品管理・在庫管理",
    "売場づくり",
    "店舗運営",
    "スタッフ育成",
    "その他"
  ],

  "事務・企画・管理系": [
    "一般事務・書類作成",
    "データ入力・集計",
    "電話・メール対応",
    "来客・受付対応",
    "受発注・納期調整",
    "請求書・伝票処理",
    "経理補助",
    "採用事務",
    "勤怠・労務管理",
    "社内調整",
    "資料・マニュアル作成",
    "業務改善",
    "企画・施策立案",
    "その他"
  ],

  "接客・サービス・飲食系": [
    "接客・案内",
    "注文受付",
    "配膳・提供",
    "調理・調理補助",
    "レジ・会計",
    "予約受付",
    "商品陳列・品出し",
    "在庫管理・発注",
    "清掃・衛生管理",
    "お客様からの問い合わせ対応",
    "クレーム対応",
    "新人教育・スタッフ育成",
    "シフト管理",
    "その他"
  ],

  "IT・Web系": [
    "要件整理・要件定義",
    "システム設計",
    "プログラム開発",
    "テスト・検証",
    "システム運用・保守",
    "問い合わせ・ヘルプデスク対応",
    "PC・アカウント設定",
    "IT資産管理",
    "データ集計・分析",
    "Webサイト運用・更新",
    "業務自動化・効率化",
    "プロジェクト管理・進行管理",
    "その他"
  ],

  "クリエイティブ系": [
    "Webデザイン",
    "グラフィックデザイン",
    "画像制作・編集",
    "写真撮影・加工",
    "動画撮影・編集",
    "記事・コンテンツ作成",
    "ライティング・編集",
    "SNS・Webコンテンツ運用",
    "制作進行管理",
    "その他"
  ],

  "製造・物流・技術系": [
    "製造・組立",
    "加工・機械操作",
    "検品・品質確認",
    "品質管理",
    "梱包",
    "仕分け・ピッキング",
    "入出荷作業",
    "在庫管理",
    "配送・運搬",
    "製品・設備設計",
    "施工管理",
    "設備保守・メンテナンス",
    "安全管理",
    "その他"
  ],

  "医療・福祉系": [
    "受付・患者対応",
    "医療事務・会計",
    "レセプト業務",
    "診療・処置補助",
    "バイタルチェック",
    "服薬・健康管理",
    "身体介助",
    "生活支援",
    "記録作成",
    "レクリエーション実施",
    "利用者・家族対応",
    "関係機関との連携",
    "その他"
  ],

  "教育・保育系": [
    "授業・学習指導",
    "個別指導",
    "教材・資料作成",
    "学習進捗管理",
    "生徒・保護者対応",
    "児童・幼児の見守り",
    "生活支援",
    "行事・イベント運営",
    "指導計画作成",
    "その他"
  ],

  "美容・生活サービス系": [
    "接客・カウンセリング",
    "施術・サービス提供",
    "予約受付・管理",
    "レジ・会計",
    "商品販売",
    "店舗清掃・衛生管理",
    "施設・建物清掃",
    "巡回・警備",
    "安全確認",
    "その他"
  ],

  "専門職": [
    "調査・分析",
    "企画・提案",
    "コンサルティング",
    "研究・開発",
    "実験・評価",
    "資料・報告書作成",
    "顧客・関係者対応",
    "プロジェクト管理",
    "その他"
  ],

  "公務員": [
    "窓口・住民対応",
    "申請受付・審査",
    "行政文書作成",
    "データ入力・管理",
    "関係部署との調整",
    "事業・施策運営",
    "予算・会計関連業務",
    "問い合わせ対応",
    "その他"
  ],

  "その他": [
    "接客・顧客対応",
    "電話・メール対応",
    "データ入力・事務作業",
    "商品・在庫管理",
    "資料作成",
    "スタッフ教育",
    "業務改善",
    "その他"
  ]
};


window.onload = function () {
  resetModalObj = new bootstrap.Modal(document.getElementById('resetModal'));
  initLicenseCategories();
  loadFromLocal();
  render();
};

function initLicenseCategories() {
  const sel = document.getElementById('license_cat');
  if (!sel) return;
  sel.innerHTML = '<option value="">カテゴリ選択</option>';
  Object.keys(embeddedLicenseMaster).forEach(c => sel.add(new Option(c, c)));
}

function updateLicenseOptions() {
  const cat = document.getElementById('license_cat').value;
  const sel = document.getElementById('license_name');
  const customInput = document.getElementById('license_name_custom');

  if (cat === "★ リストにない資格（直接入力）") {
    sel.classList.add('d-none');
    customInput.classList.remove('d-none');
    customInput.value = "";
  } else {
    sel.classList.remove('d-none');
    customInput.classList.add('d-none');
    sel.innerHTML = '<option value="">資格を選択</option>';
    if (embeddedLicenseMaster[cat]) {
      embeddedLicenseMaster[cat].forEach(n => sel.add(new Option(n, n)));
    }
  }
}

function togglePreview() {
  syncCurrentCardFromDOM();

  // 入力画面 → プレビューへ進むときだけ事前チェック
  if (!isPreviewMode) {

    // 氏名が未入力か確認
    const userName = document.getElementById('user_name').value.trim();

    if (!userName) {
      const warningModal = new bootstrap.Modal(
        document.getElementById('userNameWarningModal')
      );
      warningModal.show();
      return;
    }

    const hasMissingCompanyName = state.cards.some(c => {
      const hasTaskInput = (c.task_blocks || []).some(tb =>
        tb.job_category ||
        tb.job_type ||
        (tb.main_tasks && tb.main_tasks.length > 0) ||
        tb.task_other_detail ||
        tb.task_freq ||
        tb.detail
      );

      const hasOtherInput =
        c.from_ym ||
        c.to_ym ||
        c.is_current ||
        hasTaskInput;

      return !c.company_name && hasOtherInput;
    });

    if (hasMissingCompanyName) {
      const warningModal = new bootstrap.Modal(
        document.getElementById('companyNameWarningModal')
      );
      warningModal.show();
      return;
    }

    // 会社名はあるが、職種・業務内容が未入力の職歴がないか確認
    const hasMissingJobDetail = state.cards.some(c => {
      if (!c.company_name) return false;

      const hasTaskInput = (c.task_blocks || []).some(tb =>
        tb.job_category ||
        tb.job_type ||
        (tb.main_tasks && tb.main_tasks.length > 0) ||
        tb.task_other_detail
      );

      return !hasTaskInput;
    });

    if (hasMissingJobDetail) {
      const warningModal = new bootstrap.Modal(
        document.getElementById('jobDetailWarningModal')
      );
      warningModal.show();
      return;
    }

    // チェックを通過したらプレビュー内容を作成
    buildPdfPreview();
  }

  // ここまで来てから画面を切り替える
  isPreviewMode = !isPreviewMode;

  document.getElementById('input-form-area').style.display =
    isPreviewMode ? 'none' : 'block';

  document.getElementById('pdf-preview-area').style.display =
    isPreviewMode ? 'block' : 'none';

  document.getElementById('sidebar-card-section').style.display =
    isPreviewMode ? 'none' : 'block';

  document.getElementById('btn-toggle-preview').innerText =
    isPreviewMode ? '📝 入力画面に戻る' : '👁 完成プレビュー／PDF化';
}

function compareCards(a, b) {
  if (a.is_current && !b.is_current) return -1;
  if (!a.is_current && b.is_current) return 1;
  const dateA = a.from_ym || "0000-00";
  const dateB = b.from_ym || "0000-00";
  return dateB.localeCompare(dateA);
}

function buildPdfPreview() {


  const today = new Date();
  document.getElementById('pv-date').innerText = today.getFullYear() + '年' + (today.getMonth() + 1) + '月' + today.getDate() + '日';
  document.getElementById('pv-name').innerText = document.getElementById('user_name').value || '    ';

  const summaryText = document.getElementById('summary').value;
  if (summaryText.trim()) {
    document.getElementById('pv-summary-block').style.display = 'block';
    document.getElementById('pv-summary').innerText = summaryText;
  } else {
    document.getElementById('pv-summary-block').style.display = 'none';
  }

  const jobListContainer = document.getElementById('pv-job-list');
  jobListContainer.innerHTML = '';

  const sortedCards = [...state.cards].sort(compareCards);

  sortedCards.forEach((c, idx) => {
    if (!c.company_name) return;

    const block = document.createElement('div');
    block.className = 'doc-block';

    let period = '';
    if (c.from_ym) period += c.from_ym.replace('-', '年') + '月 ～ ';
    period += c.is_current ? '現在（在職中）' : (c.to_ym ? c.to_ym.replace('-', '年') + '月' : '');

    let tasksHtml = '';
    (c.task_blocks || []).forEach(tb => {
      let tText = (tb.main_tasks || []).join('、');
      if (tb.task_other_detail) tText += (tText ? '、' : '') + tb.task_other_detail;
      if (tb.job_category || tb.job_type || tText) {
        tasksHtml += `
              <div class="doc-sub-text">
  ${(tb.job_category || tb.job_type)
            ? '<b>職種：</b> ' + (tb.job_category || '') + (tb.job_type ? '（' + tb.job_type + '）' : '') + '<br>'
            : ''}

  ${tText
            ? '<b>業務：</b> ' + tText + (tb.task_freq ? '【頻度：' + tb.task_freq + '】' : '') + '<br>'
            : ''}

  ${tb.supplement
            ? '<b>補足：</b> ' + tb.supplement + '<br>'
            : ''}
</div>
            `;
      }
    });

    block.innerHTML = `
          <div class="doc-item-title">【${idx + 1}】 ${c.company_name}</div>
          <div class="doc-sub-text">
            ${period ? '<b>期間：</b>' + period + ' ' : ''}
            ${c.employment_type ? '<b>雇用形態：</b>' + c.employment_type + ' ' : ''}
            ${c.position ? '<b>役職：</b>' + c.position : ''}
          </div>
          ${tasksHtml}
          ${c.achievement_detail ? `<div class="doc-sub-text"><b>成果・実績：</b><br>${c.achievement_detail}</div>` : ''}
          ${c.evaluation_detail ? `<div class="doc-sub-text"><b>社内評価：</b><br>${c.evaluation_detail}</div>` : ''}
        `;
    jobListContainer.appendChild(block);
  });

  const hasLicenses = state.licenses && state.licenses.length > 0;
  const otherSkillsText = document.getElementById('other_skills_common').value;
  if (hasLicenses || otherSkillsText.trim()) {
    document.getElementById('pv-skill-block').style.display = 'block';

    const sortedLicenses = [...(state.licenses || [])].sort((a, b) => {
      const dateA = a.date || "0000-00";
      const dateB = b.date || "0000-00";
      return dateB.localeCompare(dateA);
    });

    document.getElementById('pv-licenses').innerHTML = sortedLicenses.map(l => `・${l.date ? l.date.replace('-', '年') + '月 ' : ''}${l.name} ${l.detail ? '(' + l.detail + ')' : ''}`).join('');
    document.getElementById('pv-other-skills').innerText = otherSkillsText;
  } else {
    document.getElementById('pv-skill-block').style.display = 'none';
  }

  const skillsText = document.getElementById('skills').value;
  const nextUseText = document.getElementById('next_use').value;
  if (skillsText.trim() || nextUseText.trim()) {
    document.getElementById('pv-pr-block').style.display = 'block';

    document.getElementById('pv-skills').innerHTML = skillsText
      ? `<strong>【これまでの業務で身についたこと】</strong><br>${skillsText.replace(/\n/g, '<br>')}`
      : '';

    document.getElementById('pv-next-use').innerHTML = nextUseText
      ? `<strong>【次に活かしたい点・自己PR】</strong><br>${nextUseText.replace(/\n/g, '<br>')}`
      : '';

  } else {
    document.getElementById('pv-pr-block').style.display = 'none';
  }
}

// 画面の入力内容をアクティブな会社オブジェクトへ厳密にコピー（参照を共有させない）
// ★重要: この関数は「画面(DOM)が現在アクティブなカードの内容を表示している」場合にのみ呼び出すこと。
//         カード切替・追加・削除の直後、再描画が完了する前に呼ぶとDOMの残骸で別カードを汚染するので厳禁。
function syncCurrentCardFromDOM() {
  if (state.activeTab === 'job' && state.cards[state.activeIndex]) {
    const card = state.cards[state.activeIndex];

    card.company_name = document.getElementById('company_name').value || "";
    card.from_ym = document.getElementById('from_ym').value || "";
    card.to_ym = document.getElementById('to_ym').value || "";
    card.is_current = document.getElementById('is_current').checked;
    card.employment_type = document.getElementById('employment_type').value || "";
    card.has_position = document.getElementById('has_position').value || "無し";
    card.position = document.getElementById('position').value || "";
    card.achievement_detail = document.getElementById('achievement_detail').value || "";
    card.evaluation_detail = document.getElementById('evaluation_detail').value || "";

    const blockDivs = document.querySelectorAll('#task-blocks-container .task-block');
    const newBlocks = [];
    blockDivs.forEach(div => {
      const cat = div.querySelector('.tb-cat').value;
      const subcat = cat === 'その他'
        ? (div.querySelector('.tb-subcat-custom') ? div.querySelector('.tb-subcat-custom').value : '')
        : div.querySelector('.tb-subcat').value;
      const freq = div.querySelector('.tb-freq').value;
      const supp = div.querySelector('.tb-supplement').value;

      const checkedTasks = Array.from(div.querySelectorAll('.tb-checkboxes input:checked')).map(c => c.value);

      const otherDet =
        checkedTasks.includes('その他') && div.querySelector('.tb-other-detail')
          ? div.querySelector('.tb-other-detail').value
          : '';



      newBlocks.push({
        job_category: cat,
        job_type: subcat,
        main_tasks: [...checkedTasks],
        task_other_detail: otherDet,
        task_freq: freq,
        supplement: supp
      });
    });
    // JSONラウンドトリップで確実にディープコピー化してから代入（配列/オブジェクトの参照共有を断つ）
    card.task_blocks = newBlocks.length > 0 ? JSON.parse(JSON.stringify(newBlocks)) : [getNewTaskBlock()];
  }
}

function saveToLocal(showAlert = false) {
  syncCurrentCardFromDOM();
  const payload = {
    user_name: document.getElementById('user_name').value,
    summary: document.getElementById('summary').value,
    cards: state.cards,
    licenses: state.licenses,
    other_skills: document.getElementById('other_skills_common').value,
    skills: document.getElementById('skills').value,
    next_use: document.getElementById('next_use').value
  };
  localStorage.setItem('my_resume_data', JSON.stringify(payload));

  if (showAlert) {
    const toast = document.getElementById('toast-notification');
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 2000);
  }
}

function getNewTaskBlock() {
  return { job_category: "", job_type: "", main_tasks: [], task_other_detail: "", task_freq: "", supplement: "" };
}

function getNewCard() {
  return {
    company_name: "",
    from_ym: "",
    to_ym: "",
    is_current: false,
    employment_type: "",
    has_position: "無し",
    position: "",
    task_blocks: [getNewTaskBlock()],
    achievement_detail: "",
    evaluation_detail: ""
  };
}

// データの完全分離化（ディープコピー処理）
function sanitizeCard(card) {
  if (!card || typeof card !== 'object') return getNewCard();
  const sanitized = JSON.parse(JSON.stringify(card));
  if (!sanitized.task_blocks || !Array.isArray(sanitized.task_blocks) || sanitized.task_blocks.length === 0) {
    sanitized.task_blocks = [getNewTaskBlock()];
  }
  return sanitized;
}

function loadFromLocal() {
  const saved = localStorage.getItem('my_resume_data');
  if (saved) {
    try {
      const data = JSON.parse(saved);
      document.getElementById('user_name').value = data.user_name || "";
      document.getElementById('summary').value = data.summary || "";
      document.getElementById('other_skills_common').value = data.other_skills || "";
      document.getElementById('skills').value = data.skills || "";
      document.getElementById('next_use').value = data.next_use || "";

      if (data.cards && data.cards.length) {
        state.cards = data.cards.map(c => sanitizeCard(c));
      } else {
        state.cards = [getNewCard()];
      }
      state.licenses = data.licenses || [];
    } catch (e) {
      state.cards = [getNewCard()];
    }
  } else {
    state.cards = [getNewCard()];
  }
}

function showResetModal() {
  resetModalObj.show();
}

function executeClearAll() {
  localStorage.removeItem('my_resume_data');
  document.getElementById('user_name').value = "";
  document.getElementById('summary').value = "";
  document.getElementById('other_skills_common').value = "";
  document.getElementById('skills').value = "";
  document.getElementById('next_use').value = "";

  state.cards = [getNewCard()];
  state.licenses = [];
  state.activeIndex = 0;
  state.activeTab = 'job';

  render();
  resetModalObj.hide();
}

function switchTab(tab) {
  syncCurrentCardFromDOM();
  state.activeTab = tab;
  render();
}

function switchCard(i) {
  syncCurrentCardFromDOM();
  state.activeTab = 'job';
  state.activeIndex = i;
  render();
}

function render() {
  const list = document.getElementById('card-list');
  list.innerHTML = state.cards.map((c, i) => `
        <div class="card-item ${state.activeTab === 'job' && i === state.activeIndex ? 'active-card' : ''}" onclick="switchCard(${i})">
          <span class="text-truncate d-block">${c.company_name || '(未入力の会社)'}</span>
          <span class="text-danger float-end" style="margin-top:-20px;" onclick="deleteCard(event, ${i})">×</span>
        </div>`).join('');

  document.getElementById('tab-skill').className = `card-item mt-3 text-center fw-bold ${state.activeTab === 'skill' ? 'active-card' : ''}`;
  document.getElementById('editor').classList.toggle('d-none', state.activeTab !== 'job');
  document.getElementById('skill-editor').classList.toggle('d-none', state.activeTab !== 'skill');

  if (state.activeTab === 'job') {
    // ① 表示専用のディープコピーを取得（stateの参照は絶対に直接いじらない）
    const card = sanitizeCard(state.cards[state.activeIndex]);
    const fields = ["company_name", "from_ym", "to_ym", "employment_type", "has_position", "position", "achievement_detail", "evaluation_detail"];
    fields.forEach(id => { if (document.getElementById(id)) document.getElementById(id).value = card[id] || ""; });
    document.getElementById('is_current').checked = card.is_current || false;
    document.getElementById('to_ym').disabled = card.is_current || false;

    // ② 表示切替のみ（sync=false）。ここで同期処理を走らせると、
    //    まだ古いDOMが残っている#task-blocks-containerの内容を新カードへ誤って書き込んでしまう。
    togglePositionDetail(false);

    // ③ task-blocks-container を破棄→新カードのデータのみから再構築
    renderTaskBlocks();
  } else {
    renderLicenses();
  }
}

function renderTaskBlocks() {
  const card = sanitizeCard(state.cards[state.activeIndex]);
  const container = document.getElementById('task-blocks-container');
  container.innerHTML = ''; // 古いDOMを完全破棄

  card.task_blocks.forEach((tb, bIdx) => {
    const blockDiv = document.createElement('div');
    blockDiv.className = 'task-block';

    const catVal = tb.job_category || "";
    const freqVal = tb.task_freq || "";

    blockDiv.innerHTML = `
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="badge bg-primary">担当業務パターン ${bIdx + 1}</span>
            ${card.task_blocks.length > 1 ? `<button type="button" class="btn btn-sm btn-outline-danger" onclick="removeTaskBlock(${bIdx})">削除 ×</button>` : ''}
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">職種カテゴリ</label>
              <select class="form-select tb-cat" onchange="onTaskCatChange(${bIdx}, this.value)">
  <option value="" ${catVal === '' ? 'selected' : ''}>選択してください</option>
  ${Object.keys(jobData).map(cat =>
      `<option value="${cat}" ${catVal === cat ? 'selected' : ''}>${cat}</option>`
    ).join('')}
</select>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">職種詳細</label>
              <select class="form-select tb-subcat ${catVal === 'その他' ? 'd-none' : ''}" onchange="onTaskSubCatChange(${bIdx}, this.value)"></select>
              <input type="text" class="form-control tb-subcat-custom ${catVal === 'その他' ? '' : 'd-none'}" value="${tb.job_type || ''}" oninput="saveToLocal()" placeholder="職種詳細を自由入力してください">
            </div>
          </div>
          <label class="form-label mb-2">主な業務内容（複数選択可）</label>
          <div class="row mb-3 px-2 tb-checkboxes"></div>
          <div class="mb-3 ${(tb.main_tasks || []).includes('その他') ? '' : 'd-none'} tb-other-box">
            <input type="text" class="form-control tb-other-detail" value="${tb.task_other_detail || ''}" oninput="saveToLocal()" placeholder="「その他」の詳細内容を記入">
          </div>
          <div class="row">
            <div class="col-md-4 mb-2">
              <label class="form-label">業務頻度</label>
              <select class="form-select tb-freq" onchange="saveToLocal()">
                <option value="" ${freqVal === '' ? 'selected' : ''}>選択</option>
                <option value="毎日" ${freqVal === '毎日' ? 'selected' : ''}>毎日</option>
                <option value="週数回" ${freqVal === '週数回' ? 'selected' : ''}>週数回</option>
                <option value="月数回" ${freqVal === '月数回' ? 'selected' : ''}>月数回</option>
                <option value="不定期" ${freqVal === '不定期' ? 'selected' : ''}>不定期</option>
              </select>
            </div>
            <div class="col-md-8 mb-2">
              <label class="form-label">業務内容の補足・具体的な実績</label>
              <input type="text" class="form-control tb-supplement" value="${tb.supplement || ''}" oninput="saveToLocal()" placeholder="例：3D CADによる筐体設計を担当">
            </div>
          </div>
        `;
    container.appendChild(blockDiv);

    const subSelect = blockDiv.querySelector('.tb-subcat');
    subSelect.innerHTML = '<option value="">選択</option>';
    if (catVal && jobData[catVal]) {
      jobData[catVal].forEach(i => {
        const opt = new Option(i, i);
        if (i === (tb.job_type || '')) opt.selected = true;
        subSelect.add(opt);
      });
    }

    const cbContainer = blockDiv.querySelector('.tb-checkboxes');
    let tList = [];
    if (tb.job_type && detailTaskData[tb.job_type]) {
      tList = detailTaskData[tb.job_type];
    } else if (catVal && taskData[catVal]) {
      tList = taskData[catVal];
    }

    tList.forEach(t => {
      const d = document.createElement('div');
      d.className = 'form-check col-md-4';
      const isChecked = Array.isArray(tb.main_tasks) && tb.main_tasks.includes(t);
      d.innerHTML = `<input class="form-check-input" type="checkbox" value="${t}" ${isChecked ? 'checked' : ''} onchange="saveToLocal()"><label class="form-check-label">${t}</label>`;
      cbContainer.appendChild(d);
    });
  });
}

function addTaskBlock() {
  syncCurrentCardFromDOM();
  const card = state.cards[state.activeIndex];
  card.task_blocks.push(getNewTaskBlock());
  renderTaskBlocks();
  saveToLocal();
}

function removeTaskBlock(bIdx) {
  syncCurrentCardFromDOM();
  const card = state.cards[state.activeIndex];
  card.task_blocks.splice(bIdx, 1);
  renderTaskBlocks();
  saveToLocal();
}

function onTaskCatChange(bIdx, catVal) {
  syncCurrentCardFromDOM();
  const tb = state.cards[state.activeIndex].task_blocks[bIdx];
  tb.job_category = catVal;
  tb.job_type = "";
  tb.main_tasks = [];
  renderTaskBlocks();
  saveToLocal();
}

function onTaskSubCatChange(bIdx, subVal) {
  syncCurrentCardFromDOM();
  const tb = state.cards[state.activeIndex].task_blocks[bIdx];
  tb.job_type = subVal;
  tb.main_tasks = [];
  renderTaskBlocks();
  saveToLocal();
}

function addCard() {
  // ① 現在の画面入力を「今アクティブなカード」へ確定保存（まだactiveIndexは切り替えていない状態で行う）
  syncCurrentCardFromDOM();

  // ③ 完全に空のtask_blocksを持つ新規オブジェクトを、既存カードの入力を一切吸い上げずに生成
  const freshCard = JSON.parse(JSON.stringify(getNewCard()));
  state.cards.push(freshCard);
  state.activeIndex = state.cards.length - 1;
  state.activeTab = 'job';

  // ② render() 内で #task-blocks-container を破棄→新カード(空)のデータのみで再構築する
  render();
  saveToLocal();
}

function deleteCard(e, i) {
  e.stopPropagation();
  if (state.cards.length <= 1) { return; }
  // 削除操作なので現在の画面入力を同期する必要はない（同期すると削除直前のDOMが別カードを汚染しかねない）
  state.cards.splice(i, 1);
  state.activeIndex = 0;
  render();
  saveToLocal();
}

function addLicense() {
  const d = document.getElementById('license_date').value;
  const cat = document.getElementById('license_cat').value;
  const det = document.getElementById('license_detail').value;
  let name = "";

  if (cat === "★ リストにない資格（直接入力）") {
    name = document.getElementById('license_name_custom').value;
  } else {
    name = document.getElementById('license_name').value;
  }

  if (!d || !name) { return; }
  state.licenses.push({ date: d, name: name, detail: det });

  document.getElementById('license_date').value = "";
  document.getElementById('license_detail').value = "";
  document.getElementById('license_name_custom').value = "";
  document.getElementById('license_cat').value = "";
  updateLicenseOptions();

  renderLicenses();
  saveToLocal();
}

function renderLicenses() {
  const list = document.getElementById('license-list'); if (!list) return;
  state.licenses.sort((a, b) => (b.date || "0000-00").localeCompare(a.date || "0000-00"));

  list.innerHTML = (state.licenses || []).map((l, i) => `
        <div class="license-card">
          <div><span class="fw-bold me-3">${l.date ? l.date.replace('-', '/') : ''}</span><span class="fw-bold me-3">${l.name}</span><span class="text-primary">${l.detail || ''}</span></div>
          <button type="button" class="btn btn-sm text-danger" onclick="removeLicense(${i})">削除</button>
        </div>`).join('');
}

function removeLicense(i) { state.licenses.splice(i, 1); renderLicenses(); saveToLocal(); }

// sync=true: ユーザーがhas_positionを直接操作した時用（画面が現在のカードと一致している前提で保存してよい）
// sync=false: render()からの呼び出し用（表示のトグルのみ。DOMがまだ新カードと一致していないので同期は絶対NG）
function togglePositionDetail(sync = true) {
  document.getElementById('position_detail_container').classList.toggle('d-none', document.getElementById('has_position').value !== '有り');
  if (sync) saveToLocal();
}

function toggleCurrentJob() { const isChecked = document.getElementById('is_current').checked; document.getElementById('to_ym').disabled = isChecked; if (isChecked) document.getElementById('to_ym').value = ""; saveToLocal(); }