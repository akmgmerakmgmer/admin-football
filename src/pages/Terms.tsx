import CheckIcon from '@mui/icons-material/Check';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import PageContainer from '../components/Containers/PageContainer';


export default function TermsAndPrivacy() {
    const { t, i18n } = useTranslation()
    const features = [
        {
            name: 'Return and Refund',
            nameAr: 'الاستبدال و الاسترجاع',
            description: 'In cooperation with the Egyptian Consumer Protection you can exchange and return any product within 14 days in case of any defect or non-conformity with the specifications offered',
            descriptionAr: 'بالتعاون مع حماية المستهلك المصرية يمكنك استبدال و استرجاع اي منتج خلال 14 يوم في حال وجود اي خلل به او عدم مطابقته للمواصفات المعروضة'
        },
        {
            name: 'Shipping Fees',
            nameAr: 'رسوم الشحن',
            description: 'The shipping fees for all orders will be charged at a flat rate of 30EGP.',
            descriptionAr: "سيتم تحصيل رسوم الشحن لجميع الطلبات بمبلغ ثابت قدره 30 جنيهًا مصريًا."
        },
        {
            name: 'Disclaimer for Wrong Information',
            nameAr: "اخلاء المسؤولية بشأن المعلومات الغير صحيحة",
            description: 'As a supplier, we are not responsible for any incorrect or misleading information displayed on our platform or provided by third-party sources.',
            descriptionAr: "بصفتنا موردين، فإننا غير مسؤولين عن أي معلومات غير صحيحة أو مضللة تقدم من مصادر طرف ثالث."
        },
        {
            name: "Profit Withdrawal Policy",
            nameAr: "سياسة سحب الأرباح",
            description: "The profit from each order will be released after a period of 7 days from the date the item is delivered to the customer.",
            descriptionAr: "سيتم إصدار الربح من كل طلب بعد مرور فترة 7 أيام من تاريخ تسليم العنصر للعميل."
        },
    ]
    return (
        <PageContainer>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">{t('terms')}</h2>
                </div>
                <dl className="mt-12 space-y-10 sm:grid grid-cols-2 gap-x-5 sm:gap-y-12 sm:space-y-0">
                    {features.map((feature) => (
                        <div key={feature.name} className="relative">
                            <dt>
                                <CheckIcon className="absolute h-6 w-6 text-green-500" aria-hidden="true" />
                                <p className="ltr:ml-9 rtl:mr-9 text-lg font-medium leading-6 text-gray-900">{i18n.language === 'ar' ? feature.nameAr : feature.name}</p>
                            </dt>
                            <dd className="mt-2 ltr:ml-9 rtl:mr-9 text-base text-gray-500">{i18n.language === 'ar' ? feature.descriptionAr : feature.description} {feature.name === 'Terms and Privacy' && <Link to={'/privacy'}><span className='text-primaryColor hover:underline'>{t('readMore')}</span></Link>} .</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </PageContainer>
    )
}