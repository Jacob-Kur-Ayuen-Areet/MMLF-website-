<?php

namespace Database\Seeders;

use App\Models\AnnualReport;
use App\Models\Category;
use App\Models\ContactMessage;
use App\Models\Donation;
use App\Models\News;
use App\Models\Page;
use App\Models\Permission;
use App\Models\Program;
use App\Models\Role;
use App\Models\SiteSetting;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Roles
        $superAdmin = Role::create(['name' => 'super_admin', 'display_name' => 'Super Admin', 'description' => 'Full system access']);
        $contentManager = Role::create(['name' => 'content_manager', 'display_name' => 'Content Manager', 'description' => 'Manage content']);

        // Permissions
        $perms = ['manage_users', 'manage_programs', 'manage_news', 'manage_publications', 'manage_reports', 'manage_donations', 'manage_contacts', 'manage_settings'];
        foreach ($perms as $perm) {
            $p = Permission::create(['name' => $perm, 'display_name' => ucwords(str_replace('_', ' ', $perm))]);
            $superAdmin->permissions()->attach($p);
        }
        foreach (['manage_programs', 'manage_news', 'manage_publications', 'manage_reports'] as $perm) {
            $p = Permission::where('name', $perm)->first();
            $contentManager->permissions()->attach($p);
        }

        // Users
        $admin = User::create([
            'name'     => 'Super Administrator',
            'email'    => 'admin@mmlf.org',
            'password' => Hash::make('Admin@2024!'),
        ]);
        $admin->roles()->attach($superAdmin);

        $editor = User::create([
            'name'     => 'Content Editor',
            'email'    => 'editor@mmlf.org',
            'password' => Hash::make('Editor@2024!'),
        ]);
        $editor->roles()->attach($contentManager);

        // Categories
        $newsCategories = [
            ['name' => 'Foundation News', 'type' => 'news'],
            ['name' => 'Education', 'type' => 'news'],
            ['name' => 'Healthcare', 'type' => 'news'],
            ['name' => 'Community', 'type' => 'news'],
            ['name' => 'Scholarships', 'type' => 'news'],
        ];
        foreach ($newsCategories as $cat) {
            Category::create($cat);
        }

        // Programs
        $programs = [
            [
                'title'       => 'Scholarship Program',
                'slug'        => 'scholarship-program',
                'summary'     => 'Empowering South Sudanese youth through education by providing scholarships to deserving students.',
                'description' => '<p>The MMLF Scholarship Program is committed to breaking the cycle of poverty through education. We provide comprehensive financial support to bright students from disadvantaged backgrounds across South Sudan.</p><p>Our scholarships cover tuition fees, accommodation, books, and living allowances. We partner with universities in Uganda, Kenya, and South Sudan to ensure our scholars access quality education.</p>',
                'icon'        => 'graduation-cap',
                'is_featured' => true,
                'order'       => 1,
                'details'     => [
                    'beneficiaries' => '500+ students',
                    'countries'     => 'South Sudan, Uganda, Kenya',
                    'established'   => '2015',
                ],
            ],
            [
                'title'       => "Children's Home Project",
                'slug'        => 'childrens-home-project',
                'summary'     => 'Providing a safe, nurturing home for orphaned and vulnerable children in South Sudan.',
                'description' => '<p>The Children\'s Home Project was established to address the growing number of orphaned and abandoned children in South Sudan. Our home provides shelter, nutritious meals, education, healthcare, and emotional support.</p><p>We believe every child deserves a loving environment where they can grow, learn, and thrive. Our team of dedicated caregivers ensures each child receives individual attention and care.</p>',
                'icon'        => 'home',
                'is_featured' => true,
                'order'       => 2,
                'details'     => [
                    'capacity'    => '150 children',
                    'location'    => 'Juba, South Sudan',
                    'established' => '2017',
                ],
            ],
            [
                'title'       => 'Healthcare Services (MML Hospital)',
                'slug'        => 'healthcare-services',
                'summary'     => 'Delivering quality, affordable healthcare to underserved communities across South Sudan.',
                'description' => '<p>The Michael Makuei Lueth Hospital (MML Hospital) provides world-class medical services to communities that would otherwise have no access to quality healthcare. Our facility is equipped with modern medical equipment and staffed by qualified professionals.</p><p>We offer maternal health services, pediatric care, general medicine, surgical services, and outreach programs to remote villages.</p>',
                'icon'        => 'hospital',
                'is_featured' => true,
                'order'       => 3,
                'details'     => [
                    'capacity'    => '200 beds',
                    'location'    => 'Juba, South Sudan',
                    'patients'    => '10,000+ annually',
                ],
            ],
        ];

        foreach ($programs as $program) {
            Program::create($program);
        }

        // News Articles
        $foundationNewsCategory = Category::where('name', 'Foundation News')->first();
        $educationCategory = Category::where('name', 'Education')->first();

        $newsArticles = [
            [
                'category_id'   => $foundationNewsCategory->id,
                'user_id'       => $admin->id,
                'title'         => 'MMLF Launches New Scholarship Cohort for 2024',
                'slug'          => 'mmlf-launches-new-scholarship-cohort-2024',
                'excerpt'       => 'The Michael Makuei Lueth Foundation is proud to announce the selection of 50 new scholarship recipients for the 2024 academic year.',
                'content'       => '<p>The Michael Makuei Lueth Foundation is proud to announce the selection of 50 new scholarship recipients for the 2024 academic year. These outstanding young men and women from across South Sudan will receive full scholarships to pursue their university education.</p><p>The selection process was rigorous, with over 1,200 applications received from all ten states of South Sudan. Criteria included academic excellence, financial need, and community leadership potential.</p>',
                'is_featured'   => true,
                'is_published'  => true,
                'published_at'  => now()->subDays(5),
            ],
            [
                'category_id'   => $educationCategory->id,
                'user_id'       => $admin->id,
                'title'         => 'New School Building Inaugurated in Aweil',
                'slug'          => 'new-school-building-inaugurated-aweil',
                'excerpt'       => 'A new state-of-the-art school building was officially inaugurated in Aweil, Northern Bahr el Ghazal, serving over 800 students.',
                'content'       => '<p>The Michael Makuei Lueth Foundation celebrated a major milestone with the inauguration of a new school building in Aweil, Northern Bahr el Ghazal State. The facility will serve over 800 students from the surrounding communities.</p>',
                'is_featured'   => false,
                'is_published'  => true,
                'published_at'  => now()->subDays(15),
            ],
            [
                'category_id'   => $foundationNewsCategory->id,
                'user_id'       => $editor->id,
                'title'         => 'Annual Fundraising Gala Raises $500,000 for Community Programs',
                'slug'          => 'annual-fundraising-gala-raises-500000',
                'excerpt'       => 'The MMLF Annual Gala 2024 was a tremendous success, raising over half a million dollars for ongoing community development programs.',
                'content'       => '<p>The MMLF Annual Fundraising Gala 2024 was held at the Jubek Hotel in Juba, bringing together government officials, diplomats, business leaders, and philanthropists in a night of celebration and giving.</p><p>Thanks to the incredible generosity of our supporters, the event raised over $500,000, which will directly fund our scholarship program, children\'s home, and healthcare services for the next year.</p>',
                'is_featured'   => true,
                'is_published'  => true,
                'published_at'  => now()->subDays(30),
            ],
        ];

        foreach ($newsArticles as $article) {
            News::create($article);
        }

        // Annual Reports
        $reports = [
            ['title' => 'Annual Report 2023', 'report_year' => 2023, 'description' => 'Comprehensive overview of MMLF activities, programs, and financial statements for 2023.', 'file_path' => 'reports/annual-report-2023.pdf', 'is_published' => true],
            ['title' => 'Annual Report 2022', 'report_year' => 2022, 'description' => 'Comprehensive overview of MMLF activities, programs, and financial statements for 2022.', 'file_path' => 'reports/annual-report-2022.pdf', 'is_published' => true],
            ['title' => 'Annual Report 2021', 'report_year' => 2021, 'description' => 'Comprehensive overview of MMLF activities, programs, and financial statements for 2021.', 'file_path' => 'reports/annual-report-2021.pdf', 'is_published' => true],
        ];
        foreach ($reports as $report) {
            AnnualReport::create($report);
        }

        // Sample Donations
        $donations = [
            ['donor_name' => 'John Deng', 'donor_email' => 'john@example.com', 'donor_country' => 'Kenya', 'amount' => 500.00, 'currency' => 'USD', 'purpose' => 'Scholarship Program', 'payment_status' => 'completed', 'transaction_id' => 'TXN001'],
            ['donor_name' => 'Mary Achol', 'donor_email' => 'mary@example.com', 'donor_country' => 'USA', 'amount' => 1000.00, 'currency' => 'USD', 'purpose' => 'Healthcare Services', 'payment_status' => 'completed', 'transaction_id' => 'TXN002'],
            ['donor_name' => 'Anonymous', 'donor_email' => 'anon@example.com', 'amount' => 250.00, 'currency' => 'USD', 'purpose' => "Children's Home", 'payment_status' => 'completed', 'is_anonymous' => true],
        ];
        foreach ($donations as $donation) {
            Donation::create($donation);
        }

        // Sample Contact Messages
        ContactMessage::create([
            'name'    => 'Peter Garang',
            'email'   => 'peter@example.com',
            'subject' => 'Partnership Inquiry',
            'message' => 'I represent an NGO and would like to explore a potential partnership with MMLF for education programs.',
            'status'  => 'unread',
        ]);

        // Pages
        $pages = [
            [
                'title'        => 'About Us',
                'slug'         => 'about',
                'is_published' => true,
                'sections'     => [
                    'overview' => 'The Michael Makuei Lueth Foundation (MMLF) is a South Sudan-based non-profit organization dedicated to promoting education, healthcare, and community development across South Sudan.',
                    'mission'  => 'To empower South Sudanese communities through sustainable education, quality healthcare, and transformative community development programs.',
                    'vision'   => 'A prosperous, educated, and healthy South Sudan where every citizen can achieve their full potential.',
                    'values'   => ['Integrity', 'Compassion', 'Excellence', 'Transparency', 'Community'],
                ],
            ],
            [
                'title'        => 'Legacy',
                'slug'         => 'legacy',
                'is_published' => true,
                'sections'     => [
                    'biography' => 'Michael Makuei Lueth is a prominent South Sudanese statesman, lawyer, and advocate for education and community development. Born in South Sudan, he dedicated his life to serving his people and building a better future for the nation.',
                    'timeline'  => [
                        ['year' => '1990', 'event' => 'Began legal career and advocacy work for South Sudanese communities'],
                        ['year' => '2005', 'event' => 'Played a key role in the Comprehensive Peace Agreement negotiations'],
                        ['year' => '2011', 'event' => 'Contributed to South Sudan\'s independence process'],
                        ['year' => '2015', 'event' => 'Founded the Michael Makuei Lueth Foundation'],
                        ['year' => '2017', 'event' => 'Launched the Children\'s Home Project'],
                        ['year' => '2020', 'event' => 'MML Hospital opened its doors, serving thousands of patients'],
                        ['year' => '2023', 'event' => 'Foundation reaches 500+ scholarship beneficiaries'],
                    ],
                ],
            ],
        ];
        foreach ($pages as $page) {
            Page::create($page);
        }

        // Site Settings
        $settings = [
            ['key' => 'org_name', 'value' => 'Michael Makuei Lueth Foundation', 'type' => 'text', 'group' => 'general', 'label' => 'Organization Name'],
            ['key' => 'org_tagline', 'value' => 'Empowering Communities, Transforming Lives', 'type' => 'text', 'group' => 'general', 'label' => 'Tagline'],
            ['key' => 'org_email', 'value' => 'info@mmlf.org', 'type' => 'text', 'group' => 'contact', 'label' => 'Email Address'],
            ['key' => 'org_phone', 'value' => '+211 912 345 678', 'type' => 'text', 'group' => 'contact', 'label' => 'Phone Number'],
            ['key' => 'org_address', 'value' => 'Plot 15, Ministries Road, Juba, South Sudan', 'type' => 'text', 'group' => 'contact', 'label' => 'Address'],
            ['key' => 'facebook_url', 'value' => 'https://facebook.com/mmlf', 'type' => 'text', 'group' => 'social', 'label' => 'Facebook URL'],
            ['key' => 'twitter_url', 'value' => 'https://twitter.com/mmlf', 'type' => 'text', 'group' => 'social', 'label' => 'Twitter URL'],
            ['key' => 'youtube_url', 'value' => 'https://youtube.com/mmlf', 'type' => 'text', 'group' => 'social', 'label' => 'YouTube URL'],
            ['key' => 'instagram_url', 'value' => 'https://instagram.com/mmlf', 'type' => 'text', 'group' => 'social', 'label' => 'Instagram URL'],
            ['key' => 'impact_students', 'value' => '500', 'type' => 'text', 'group' => 'impact', 'label' => 'Students Supported'],
            ['key' => 'impact_children', 'value' => '150', 'type' => 'text', 'group' => 'impact', 'label' => 'Children in Home'],
            ['key' => 'impact_patients', 'value' => '10000', 'type' => 'text', 'group' => 'impact', 'label' => 'Patients Served'],
            ['key' => 'impact_communities', 'value' => '25', 'type' => 'text', 'group' => 'impact', 'label' => 'Communities Reached'],
            ['key' => 'meta_description', 'value' => 'The Michael Makuei Lueth Foundation promotes education, healthcare, and community development in South Sudan.', 'type' => 'text', 'group' => 'seo', 'label' => 'Default Meta Description'],
        ];

        foreach ($settings as $setting) {
            SiteSetting::create($setting);
        }
    }
}
