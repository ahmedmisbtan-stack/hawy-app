# نموذج بيانات هاوي (قبل بناء الخلفية)

هذا المستند يحدد حدود البيانات والصلاحيات المطلوبة حتى لا تتحول واجهة النموذج إلى قاعدة بيانات غير آمنة عند الإطلاق. وهو تصميم مقترح للتنفيذ، وليس دليلًا على وجود هذه الجداول أو الخدمات حاليًا.

## 1. الكيانات الأساسية

### users
- id: معرّف داخلي ثابت
- display_name, username: الاسم الظاهر واسم المستخدم الفريد
- avatar_url, bio
- city_id أو location fields اختيارية؛ لا نجمع عنوان المنزل افتراضيًا
- account_type: member | creator | admin
- verification_status
- created_at, updated_at, status

### privacy_settings
- user_id
- default_post_audience: public | followers | private
- show_followers_list
- allow_lookup_by_phone / allow_lookup_by_email
- message_policy
- searchable_profile
- يجب فرض الخيارات في API والاستعلامات، لا إخفاؤها في الواجهة فقط.

### stores
- id, owner_user_id
- name, slug, description, category_id
- logo_url, cover_url, story
- city_id / service_area / remote_available
- preparation_notes, business_hours
- order_policy, cancellation_policy, status
- created_at, updated_at

### categories
- id, parent_id, name_ar, slug, icon
- تشمل فئات فرعية قابلة للإدارة: كروشيه، تطريز، شموع، ريزن، فخار، ديكور، تنسيق حفلات، تفصيل ملابس، إكسسوارات، هدايا، رسم، حلويات وغيرها.

### listings
- id, store_id, title, description, listing_type: product | service
- price_from, price_to, currency
- made_to_order, preparation_days, availability_status
- customization_options (مقاس/لون/اسم/تفاصيل)
- media, inventory_policy, created_at, updated_at

### posts
- id, author_user_id, store_id optional
- post_type: story | work_showcase | before_after | question | recommendation_request | offer | behind_the_scenes | launch
- body, media, tags, audience
- moderation_status, created_at, updated_at

### follows
- follower_user_id, followed_user_id, created_at
- يجب منع تكرار العلاقة ومتابعة الحساب لنفسه.

### reactions and comments
- reactions: id, user_id, post_id, reaction_type, created_at
- comments: id, post_id, author_user_id, parent_comment_id optional, body, moderation_status, created_at
- الإعجابات/التفاعلات الفعلية لا تُقبل من العميل كعداد موثوق؛ العدد يُحسب من سجلات الخادم أو مخزن موثوق.

### reviews
- id, order_id, reviewer_user_id, store_id, rating, body, seller_reply, created_at
- لا يسمح بتقييم موثوق إلا بعد طلب مكتمل، مع قواعد تمنع التقييم المكرر والتحايل.

### orders and order_items
- orders: id, buyer_user_id, store_id, status, subtotal, delivery_fee, platform_fee, total, currency, delivery_method, address_ref, notes, created_at, updated_at
- order_items: id, order_id, listing_id, title_snapshot, unit_price_snapshot, quantity, customization_snapshot
- الحالات: pending_confirmation, confirmed, in_progress, ready, fulfilled, cancelled, disputed
- تحفظ snapshots للسعر والوصف وقت الطلب حتى لا تتغير الفاتورة بتعديل المنتج لاحقًا.

### conversations and messages
- conversations: id, order_id optional, created_at
- conversation_members: conversation_id, user_id
- messages: id, conversation_id, sender_user_id, body, attachment_ref, created_at, moderation_state
- لا يُسمح بقراءة الرسائل إلا للأعضاء المخولين؛ ويجب وضع حدود للإبلاغ والحظر ومكافحة الرسائل المزعجة.

### notifications
- id, user_id, type, reference_id, read_at, created_at
- لا تتضمن إشعارات عامة معلومات خاصة غير مسموح للمتلقي برؤيتها.

## 2. الأموال: دفتر قيود لا مجرد حقل رصيد

### wallet_accounts
- id, owner_type, owner_id, currency, status

### ledger_entries
- id, transaction_group_id, account_id, direction, amount_minor_units, entry_type, reference_type, reference_id, created_at
- القيود المالية غير قابلة للتعديل بعد الترحيل؛ التصحيح يتم بقيد عكسي.
- يجب أن تتوازن كل مجموعة قيود، مع فصل أموال العملاء ومستحقات البائع ورسوم المنصة وأي مبالغ تحت التسوية.
- لا يُستنتج الرصيد من قيمة يرسلها التطبيق؛ الرصيد يُحسب من دفتر القيود الموثوق.
- لا يتم تفعيل محفظة أو دفع حقيقي قبل مراجعة مزود الدفع، ومتطلبات التعاقد والامتثال والاسترداد والنزاعات.

## 3. صلاحيات لا بد من فرضها على الخادم
- المستخدم يعدّل ملفه فقط؛ مالك المتجر يدير متجره وقوائمه فقط.
- لا يستطيع العميل تغيير حالة الطلب إلى «تم التسليم» أو تزوير تقييم موثق.
- لا يستطيع أي مستخدم تعديل رصيد أو قيود مالية.
- إعداد جمهور المنشور يحدد من يمكنه قراءته في كل API، بما فيها البحث والموجز وروابط المشاركة.
- الحظر يمنع التفاعل أو المراسلة بحسب سياسة واضحة.
- لوحة الإدارة تستخدم صلاحيات منفصلة وتسجيلًا للعمليات الحساسة.

## 4. الفهارس والبحث
- فهرس لاسم المستخدم واسم المتجر وslug.
- فهارس للمحتوى حسب created_at وcategory_id وcity_id وstore_id.
- البحث الأولي: نص + فئة + منطقة + نوع منتج/خدمة + نطاق سعر + متاح حسب الطلب.
- لاحقًا يمكن إضافة بحث دلالي، لكن يجب أن يعرض سبب ملاءمة النتيجة ولا يعرّض بيانات خاصة.

## 5. سياسة الملفات والصور
- رفع الملفات عبر مسارات مخصصة، والتحقق من نوع الملف وحجمه وملكيته.
- تخزين الصور المصغرة واستخدام تحميل كسول.
- عدم وضع مفاتيح سرية أو روابط رفع مفتوحة في تطبيق الويب.
- مراجعة الصور والمحتوى وآلية البلاغات قبل الإطلاق العام.

## 6. اختبارات القبول قبل الإنتاج
- لا يستطيع مستخدم غير مسجل إنشاء منشور أو إرسال رسالة أو تنفيذ طلب.
- لا يرى المستخدم منشورًا خاصًا أو بيانات متجر/طلب غير مصرح بها.
- لا يستطيع المستخدم تقييم طلب غير مكتمل أو تقييم نفس الطلب عدة مرات.
- تتوازن قيود الأموال ويُمنع تكرار webhook الخاص بمزود الدفع (idempotency).
- تنجح عمليات البحث والفلاتر في RTL والموبايل، مع رسائل واضحة عند انعدام النتائج.
- تظل الواجهة واضحة عندما تفشل الشبكة أو تظل الصور قيد التحميل.
