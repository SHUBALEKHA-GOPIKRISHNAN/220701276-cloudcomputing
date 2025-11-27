import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Building, FileText, BarChart3, CheckCircle, XCircle, Eye, Shield, Calendar, GraduationCap, Award, Edit, DollarSign, Briefcase, Clock, Download } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { ChatBot } from './ChatBot';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { User as UserType } from '../utils/userManager';
import { toast } from 'sonner@2.0.3';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface AdminPanelProps {
  user: UserType | null;
  onLogout: () => void;
}

export function AdminPanel({ user, onLogout }: AdminPanelProps) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [generatingReport, setGeneratingReport] = useState<string | null>(null);
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [manageStudentsOpen, setManageStudentsOpen] = useState(false);
  const [editDriveOpen, setEditDriveOpen] = useState(false);
  const [selectedDrive, setSelectedDrive] = useState<any>(null);
  const [studentStatuses, setStudentStatuses] = useState<{ [key: string]: string }>({});
  const [addCompanyOpen, setAddCompanyOpen] = useState(false);
  const [scheduleNewDriveOpen, setScheduleNewDriveOpen] = useState(false);
  const [viewCompanyOpen, setViewCompanyOpen] = useState(false);
  const [viewStudentOpen, setViewStudentOpen] = useState(false);
  const [viewApplicationOpen, setViewApplicationOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [exportStudentDataOpen, setExportStudentDataOpen] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [exportFormat, setExportFormat] = useState('csv');
  const [exportDateRange, setExportDateRange] = useState('all');
  const [editStudentOpen, setEditStudentOpen] = useState(false);
  const [editStudentLoading, setEditStudentLoading] = useState(false);
  const [selectedStudentForEdit, setSelectedStudentForEdit] = useState<any>(null);
  const [trackApplicationOpen, setTrackApplicationOpen] = useState(false);
  const [selectedApplicationForTrack, setSelectedApplicationForTrack] = useState<any>(null);
  const [scheduleCompanyOpen, setScheduleCompanyOpen] = useState(false);
  const [scheduleCompanyLoading, setScheduleCompanyLoading] = useState(false);
  const [selectedCompanyForSchedule, setSelectedCompanyForSchedule] = useState<any>(null);
  const [contactStudentOpen, setContactStudentOpen] = useState(false);
  const [contactStudentLoading, setContactStudentLoading] = useState(false);
  const [downloadReportLoading, setDownloadReportLoading] = useState(false);

  const handleGenerateReport = async (reportType: string) => {
    setGeneratingReport(reportType);
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    setGeneratingReport(null);
    
    const reportMessages = {
      student: {
        title: 'Student Report Generated!',
        description: 'Complete student placement data including applications, interviews, and offers.',
      },
      company: {
        title: 'Company Report Generated!',
        description: 'Detailed report of all registered companies and their hiring statistics.',
      },
      analytics: {
        title: 'Analytics Report Generated!',
        description: 'Comprehensive analytics with charts, trends, and placement insights.',
      },
      placement: {
        title: 'Placement Report Generated!',
        description: 'Full placement report including success rates, salary statistics, and company-wise data.',
      },
    };

    const message = reportMessages[reportType as keyof typeof reportMessages];
    toast.success(message.title, {
      description: message.description,
    });
  };

  const handleViewDetails = (drive: any) => {
    setSelectedDrive(drive);
    setViewDetailsOpen(true);
  };

  const handleManageStudents = (drive: any) => {
    setSelectedDrive(drive);
    // Initialize student statuses
    const mockRegisteredStudents = [
      { id: 1, name: 'Alice Johnson', rollNumber: 'CS2021001', cgpa: '8.5', status: 'Applied' },
      { id: 2, name: 'Bob Smith', rollNumber: 'CS2021002', cgpa: '9.1', status: 'Shortlisted' },
      { id: 3, name: 'David Lee', rollNumber: 'CS2021004', cgpa: '8.8', status: 'Applied' },
      { id: 4, name: 'Emma Davis', rollNumber: 'IT2021005', cgpa: '9.0', status: 'Selected' },
      { id: 5, name: 'Frank Wilson', rollNumber: 'CS2021006', cgpa: '7.9', status: 'Rejected' },
    ];
    const initialStatuses: { [key: string]: string } = {};
    mockRegisteredStudents.forEach(student => {
      initialStatuses[student.id.toString()] = student.status;
    });
    setStudentStatuses(initialStatuses);
    setManageStudentsOpen(true);
  };

  const handleEditDrive = (drive: any) => {
    setSelectedDrive(drive);
    setEditDriveOpen(true);
  };

  const handleUpdateStudentStatus = (studentId: string, newStatus: string) => {
    setStudentStatuses(prev => ({
      ...prev,
      [studentId]: newStatus
    }));
    toast.success('Status Updated', {
      description: `Student status changed to ${newStatus}`,
    });
  };

  const handleSaveDriveChanges = () => {
    setEditDriveOpen(false);
    toast.success('Drive Updated!', {
      description: 'Placement drive details have been updated successfully.',
    });
  };

  const handleAddCompany = () => {
    setAddCompanyOpen(false);
    toast.success('Company Added!', {
      description: 'New company has been successfully added to the system.',
    });
  };

  const handleScheduleNewDrive = () => {
    setScheduleNewDriveOpen(false);
    toast.success('Drive Scheduled!', {
      description: 'New placement drive has been scheduled successfully.',
    });
  };

  const handleViewCompany = (company: any) => {
    setSelectedCompany(company);
    setViewCompanyOpen(true);
  };

  const handleViewStudent = (student: any) => {
    setSelectedStudent(student);
    setViewStudentOpen(true);
  };

  const handleViewApplication = (application: any) => {
    setSelectedApplication(application);
    setViewApplicationOpen(true);
  };

  const handleExportStudentData = async () => {
    setExportLoading(true);
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setExportLoading(false);
    setExportStudentDataOpen(false);
    
    const formatMessages = {
      csv: 'CSV file',
      excel: 'Excel spreadsheet',
      pdf: 'PDF document'
    };
    
    toast.success('Export Successful!', {
      description: `Student data has been exported as ${formatMessages[exportFormat as keyof typeof formatMessages]}. Download will begin shortly.`,
    });
  };

  const handleEditStudent = (student: any) => {
    setSelectedStudentForEdit(student);
    setEditStudentOpen(true);
  };

  const handleSaveStudentChanges = async () => {
    setEditStudentLoading(true);
    // Simulate save process
    await new Promise(resolve => setTimeout(resolve, 1500));
    setEditStudentLoading(false);
    setEditStudentOpen(false);
    toast.success('Student Updated!', {
      description: `${selectedStudentForEdit?.name}'s profile has been updated successfully.`,
    });
  };

  const handleTrackApplication = (application: any) => {
    setSelectedApplicationForTrack(application);
    setTrackApplicationOpen(true);
  };

  const handleScheduleCompany = (company: any) => {
    setSelectedCompanyForSchedule(company);
    setScheduleCompanyOpen(true);
  };

  const handleSaveSchedule = async () => {
    setScheduleCompanyLoading(true);
    // Simulate save process
    await new Promise(resolve => setTimeout(resolve, 1500));
    setScheduleCompanyLoading(false);
    setScheduleCompanyOpen(false);
    toast.success('Interaction Scheduled!', {
      description: `Meeting with ${selectedCompanyForSchedule?.name} has been scheduled successfully. Calendar invites will be sent.`,
    });
  };

  const handleDownloadApplicationReport = async () => {
    setDownloadReportLoading(true);
    // Simulate PDF generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setDownloadReportLoading(false);
    toast.success('Report Downloaded!', {
      description: `Application tracking report for ${selectedApplicationForTrack?.studentName} has been downloaded successfully.`,
    });
  };

  const handleContactStudent = () => {
    setContactStudentOpen(true);
  };

  const handleSendMessage = async () => {
    setContactStudentLoading(true);
    // Simulate message sending
    await new Promise(resolve => setTimeout(resolve, 1500));
    setContactStudentLoading(false);
    setContactStudentOpen(false);
    toast.success('Message Sent!', {
      description: `Your message has been sent to ${selectedApplicationForTrack?.studentName} successfully.`,
    });
  };

  const sidebarItems = [
    {
      icon: BarChart3,
      label: 'Dashboard',
      isActive: activeSection === 'dashboard',
      onClick: () => setActiveSection('dashboard')
    },
    {
      icon: Users,
      label: 'Student Management',
      isActive: activeSection === 'students',
      onClick: () => setActiveSection('students')
    },
    {
      icon: FileText,
      label: 'Placement Applications',
      isActive: activeSection === 'applications',
      onClick: () => setActiveSection('applications')
    },
    {
      icon: Building,
      label: 'Company Relations',
      isActive: activeSection === 'companies',
      onClick: () => setActiveSection('companies')
    },
    {
      icon: Calendar,
      label: 'Placement Drives',
      isActive: activeSection === 'drives',
      onClick: () => setActiveSection('drives')
    },
    {
      icon: Award,
      label: 'Reports & Analytics',
      isActive: activeSection === 'reports',
      onClick: () => setActiveSection('reports')
    }
  ];

  const mockStudents = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice.j@college.edu",
      rollNumber: "CS2021001",
      major: "Computer Science",
      year: "Final Year",
      cgpa: "8.5",
      status: "Placement Ready",
      placementStatus: "Applied",
      appliedCompanies: 5,
      phone: "+91 9876543210",
      address: "Mumbai, Maharashtra",
      dob: "15-Aug-2002",
      backlogs: 0,
      skills: ["React", "Node.js", "Python", "Java", "MySQL"],
      internships: ["Google Summer of Code", "Microsoft Student Partner"],
      projects: ["E-commerce Platform", "AI Chatbot", "Portfolio Website"],
      certifications: ["AWS Cloud Practitioner", "React Advanced"],
      achievements: ["Best Project Award", "Dean's List 2023"]
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob.s@college.edu",
      rollNumber: "CS2021002",
      major: "Information Technology",
      year: "Final Year",
      cgpa: "9.1",
      status: "Placed",
      placementStatus: "Selected",
      appliedCompanies: 3,
      phone: "+91 9123456780",
      address: "Delhi, India",
      dob: "22-Mar-2002",
      backlogs: 0,
      skills: ["JavaScript", "Angular", "MongoDB", "Docker", "AWS"],
      internships: ["TechCorp Summer Intern", "Startup Accelerator"],
      projects: ["Cloud Storage System", "Mobile App", "ML Model"],
      certifications: ["Google Cloud Professional", "Full Stack Developer"],
      achievements: ["Hackathon Winner", "Research Paper Published"],
      placedCompany: "Global Consulting",
      placedPackage: "10 LPA",
      placedPosition: "Business Analyst"
    },
    {
      id: 3,
      name: "Carol Williams",
      email: "carol.w@college.edu",
      rollNumber: "EC2021003",
      major: "Electronics",
      year: "Pre-Final Year",
      cgpa: "7.8",
      status: "Not Eligible",
      placementStatus: "Not Applied",
      appliedCompanies: 0,
      phone: "+91 9988776655",
      address: "Bangalore, Karnataka",
      dob: "10-Jan-2003",
      backlogs: 2,
      skills: ["VLSI Design", "Embedded Systems", "C Programming"],
      internships: [],
      projects: ["IoT Home Automation", "Signal Processing"],
      certifications: ["Embedded Systems Fundamentals"],
      achievements: []
    }
  ];

  const mockCompanies = [
    {
      id: 1,
      name: "TechCorp Solutions",
      email: "hr@techcorp.com",
      industry: "Technology",
      package: "8-12 LPA",
      status: "Active Partner",
      lastVisit: "2024-01-10",
      studentsHired: 12,
      upcomingDrive: "2024-02-15",
      phone: "+91 22 4567 8900",
      website: "www.techcorp.com",
      address: "Tech Park, Whitefield, Bangalore - 560066",
      pocName: "Rajesh Kumar",
      pocDesignation: "Senior HR Manager",
      pocEmail: "rajesh.k@techcorp.com",
      pocPhone: "+91 98765 43210",
      employeeCount: "5000+",
      founded: "2010",
      description: "Leading technology solutions provider specializing in cloud computing, AI/ML, and enterprise software development.",
      hiringRoles: ["Software Engineer", "DevOps Engineer", "Data Scientist", "Frontend Developer"],
      pastDrives: [
        { year: "2023", studentsHired: 12, positions: "Software Engineer, Data Analyst" },
        { year: "2022", studentsHired: 10, positions: "Full Stack Developer" },
        { year: "2021", studentsHired: 8, positions: "Software Engineer" }
      ],
      eligibilityCriteria: "Minimum CGPA: 7.5, No active backlogs, CSE/IT/ECE branches",
      benefits: ["Health Insurance", "Flexible Work Hours", "Learning Budget", "Stock Options"]
    },
    {
      id: 2,
      name: "StartupXYZ",
      email: "careers@startupxyz.com",
      industry: "FinTech",
      package: "6-10 LPA",
      status: "Scheduled",
      lastVisit: "2023-12-05",
      studentsHired: 0,
      upcomingDrive: "2024-02-20",
      phone: "+91 80 2345 6789",
      website: "www.startupxyz.com",
      address: "Koramangala, Bangalore - 560034",
      pocName: "Priya Sharma",
      pocDesignation: "Talent Acquisition Lead",
      pocEmail: "priya.s@startupxyz.com",
      pocPhone: "+91 91234 56789",
      employeeCount: "200-500",
      founded: "2019",
      description: "Fast-growing fintech startup revolutionizing digital payments and financial services with innovative technology.",
      hiringRoles: ["Product Intern", "Backend Developer", "UI/UX Designer", "Marketing Intern"],
      pastDrives: [],
      eligibilityCriteria: "Minimum CGPA: 7.0, All branches welcome",
      benefits: ["Competitive Salary", "ESOPs", "Casual Work Culture", "Learning Opportunities"]
    },
    {
      id: 3,
      name: "Global Consulting",
      email: "recruitment@globalconsult.com",
      industry: "Consulting",
      package: "10-15 LPA",
      status: "Completed",
      lastVisit: "2024-01-08",
      studentsHired: 8,
      upcomingDrive: null,
      phone: "+91 11 4567 8901",
      website: "www.globalconsult.com",
      address: "Cyber City, Gurugram - 122002",
      pocName: "Amit Patel",
      pocDesignation: "Campus Recruitment Manager",
      pocEmail: "amit.p@globalconsult.com",
      pocPhone: "+91 98876 54321",
      employeeCount: "10000+",
      founded: "1995",
      description: "Global management consulting firm helping organizations transform and achieve sustainable growth.",
      hiringRoles: ["Business Analyst", "Management Consultant", "Strategy Analyst"],
      pastDrives: [
        { year: "2023", studentsHired: 8, positions: "Business Analyst" },
        { year: "2022", studentsHired: 6, positions: "Consultant" }
      ],
      eligibilityCriteria: "Minimum CGPA: 8.0, No backlogs, All branches",
      benefits: ["Global Exposure", "Professional Development", "Travel Opportunities", "Premium Benefits"]
    }
  ];

  const mockApplications = [
    {
      id: 1,
      studentName: "Alice Johnson",
      rollNumber: "CS2021001",
      company: "TechCorp Solutions",
      position: "Software Engineer",
      package: "12 LPA",
      applicationDate: "2024-01-14",
      status: "Shortlisted",
      round: "Technical Interview",
      studentEmail: "alice.j@college.edu",
      studentPhone: "+91 9876543210",
      studentCGPA: "8.5",
      studentBranch: "Computer Science",
      driveDate: "2024-02-15",
      timeline: [
        { stage: "Application Submitted", date: "2024-01-14", status: "Completed" },
        { stage: "Resume Screening", date: "2024-01-16", status: "Completed" },
        { stage: "Aptitude Test", date: "2024-01-20", status: "Completed", score: "85/100" },
        { stage: "Technical Interview", date: "2024-01-25", status: "Scheduled" },
        { stage: "HR Interview", date: "Pending", status: "Pending" },
        { stage: "Final Decision", date: "Pending", status: "Pending" }
      ],
      documents: ["Resume", "Academic Transcripts", "ID Proof"],
      notes: "Strong technical skills. Good communication. Recommended for next round."
    },
    {
      id: 2,
      studentName: "Bob Smith",
      rollNumber: "CS2021002",
      company: "Global Consulting",
      position: "Business Analyst",
      package: "10 LPA",
      applicationDate: "2024-01-12",
      status: "Selected",
      round: "Final Offer",
      studentEmail: "bob.s@college.edu",
      studentPhone: "+91 9123456780",
      studentCGPA: "9.1",
      studentBranch: "Information Technology",
      driveDate: "2024-01-08",
      timeline: [
        { stage: "Application Submitted", date: "2024-01-12", status: "Completed" },
        { stage: "Resume Screening", date: "2024-01-13", status: "Completed" },
        { stage: "Case Study Round", date: "2024-01-15", status: "Completed", score: "92/100" },
        { stage: "Technical Interview", date: "2024-01-18", status: "Completed" },
        { stage: "HR Interview", date: "2024-01-22", status: "Completed" },
        { stage: "Final Decision", date: "2024-01-24", status: "Selected - Offer Extended" }
      ],
      documents: ["Resume", "Academic Transcripts", "Offer Letter Signed", "Background Verification"],
      notes: "Excellent analytical skills. Top performer in case study. Offer accepted.",
      joiningDate: "2024-07-01"
    },
    {
      id: 3,
      studentName: "Carol Williams",
      rollNumber: "EC2021003",
      company: "StartupXYZ",
      position: "Product Intern",
      package: "6 LPA",
      applicationDate: "2024-01-10",
      status: "Rejected",
      round: "HR Interview",
      studentEmail: "carol.w@college.edu",
      studentPhone: "+91 9988776655",
      studentCGPA: "7.8",
      studentBranch: "Electronics",
      driveDate: "2024-02-20",
      timeline: [
        { stage: "Application Submitted", date: "2024-01-10", status: "Completed" },
        { stage: "Resume Screening", date: "2024-01-11", status: "Completed" },
        { stage: "Aptitude Test", date: "2024-01-14", status: "Completed", score: "62/100" },
        { stage: "Technical Interview", date: "2024-01-17", status: "Completed" },
        { stage: "HR Interview", date: "2024-01-19", status: "Rejected" }
      ],
      documents: ["Resume", "Academic Transcripts"],
      notes: "Did not meet the technical requirements for the role. Encourage to apply for other positions.",
      feedback: "Work on technical skills and reapply next year"
    }
  ];

  const mockDrives = [
    {
      id: 1,
      company: "TechCorp Solutions",
      date: "2024-02-15",
      time: "10:00 AM",
      venue: "Main Auditorium",
      positions: ["Software Engineer", "Frontend Developer"],
      eligibleStudents: 45,
      registeredStudents: 38,
      status: "Scheduled"
    },
    {
      id: 2,
      company: "StartupXYZ",
      date: "2024-02-20",
      time: "2:00 PM",
      venue: "Conference Hall",
      positions: ["Product Intern", "Marketing Intern"],
      eligibleStudents: 32,
      registeredStudents: 25,
      status: "Open for Registration"
    },
    {
      id: 3,
      company: "Global Consulting",
      date: "2024-01-08",
      time: "9:00 AM",
      venue: "Main Auditorium",
      positions: ["Business Analyst"],
      eligibleStudents: 28,
      registeredStudents: 28,
      status: "Completed"
    }
  ];

  const handleApproveStudent = (studentId: number) => {
    alert(`Approved student ${studentId}`);
  };

  const handleApproveCompany = (companyId: number) => {
    alert(`Approved company ${companyId}`);
  };

  const handleApproveInternship = (internshipId: number) => {
    alert(`Approved internship ${internshipId}`);
  };

  const renderMainContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl font-bold text-gray-900 mb-2">College Placement Dashboard</h1>
              <p className="text-gray-600">Welcome to the central hub for managing college placements and student opportunities</p>
            </motion.div>
            
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: GraduationCap, title: 'Final Year Students', value: '247', sub: 'Eligible for placement', color: 'text-blue-600', delay: 0 },
                { icon: Award, title: 'Students Placed', value: '128', sub: 'Placement rate: 52%', color: 'text-green-600', delay: 0.1 },
                { icon: Building, title: 'Partner Companies', value: '45', sub: 'Active partnerships', color: 'text-purple-600', delay: 0.2 },
                { icon: Calendar, title: 'Upcoming Drives', value: '8', sub: 'This month', color: 'text-orange-600', delay: 0.3 }
              ].map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: metric.delay }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                        <metric.icon className="h-4 w-4" />
                        {metric.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <motion.div 
                        className={`text-2xl font-bold ${metric.color}`}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: metric.delay + 0.2 }}
                      >
                        {metric.value}
                      </motion.div>
                      <p className="text-xs text-gray-600">{metric.sub}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Placements</CardTitle>
                    <CardDescription>Latest student placement updates</CardDescription>
                  </CardHeader>
                  <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Bob Smith", company: "Global Consulting", package: "10 LPA", time: "2 hours ago", status: "Selected" },
                      { name: "Alice Johnson", company: "TechCorp Solutions", package: "12 LPA", time: "4 hours ago", status: "Shortlisted" },
                      { name: "David Wilson", company: "StartupXYZ", package: "8 LPA", time: "6 hours ago", status: "Interview" },
                      { name: "Emma Davis", company: "Design Labs", package: "9 LPA", time: "1 day ago", status: "Applied" }
                    ].map((placement, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{placement.name}</p>
                          <p className="text-sm text-gray-600">{placement.company} - {placement.package}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={placement.status === 'Selected' ? 'default' : 'secondary'}>
                            {placement.status}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">{placement.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Drives</CardTitle>
                    <CardDescription>Scheduled placement drives requiring attention</CardDescription>
                  </CardHeader>
                  <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border border-blue-200 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium">TechCorp Solutions</p>
                        <p className="text-sm text-gray-600">Feb 15, 2024 - 38 registered</p>
                      </div>
                      <Button size="sm" onClick={() => setActiveSection('drives')}>
                        Manage
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border border-green-200 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium">StartupXYZ</p>
                        <p className="text-sm text-gray-600">Feb 20, 2024 - Registration open</p>
                      </div>
                      <Button size="sm" onClick={() => setActiveSection('drives')}>
                        View Details
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border border-yellow-200 bg-yellow-50 rounded-lg">
                      <div>
                        <p className="font-medium">Student Eligibility</p>
                        <p className="text-sm text-gray-600">15 students need profile updates</p>
                      </div>
                      <Button size="sm" onClick={() => setActiveSection('students')}>
                        Review
                      </Button>
                    </div>
                  </div>
                </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        );

      case 'students':
        return (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="flex justify-between items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Student Management</h1>
                <p className="text-gray-600">Manage student profiles and placement eligibility</p>
              </div>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setExportStudentDataOpen(true)}
              >
                <Download className="h-4 w-4 mr-2" />
                Export Student Data
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Details</TableHead>
                    <TableHead>Roll Number</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>CGPA</TableHead>
                    <TableHead>Placement Status</TableHead>
                    <TableHead>Applications</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-gray-600">{student.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{student.rollNumber}</TableCell>
                      <TableCell>{student.major}</TableCell>
                      <TableCell>{student.year}</TableCell>
                      <TableCell>
                        <span className={`font-medium ${parseFloat(student.cgpa) >= 8.0 ? 'text-green-600' : parseFloat(student.cgpa) >= 7.0 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {student.cgpa}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          student.placementStatus === 'Selected' ? 'default' : 
                          student.placementStatus === 'Applied' ? 'secondary' : 'outline'
                        }>
                          {student.placementStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>{student.appliedCompanies}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewStudent(student)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleEditStudent(student)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </Card>
            </motion.div>
          </motion.div>
        );

      case 'companies':
        return (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="flex justify-between items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Company Relations</h1>
                <p className="text-gray-600">Manage recruitment partners and company relationships</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setAddCompanyOpen(true)}>
                <Building className="h-4 w-4 mr-2" />
                Add New Company
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead>Package Range</TableHead>
                    <TableHead>Students Hired</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCompanies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{company.name}</p>
                          <p className="text-sm text-gray-600">{company.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{company.industry}</TableCell>
                      <TableCell>{company.package}</TableCell>
                      <TableCell>{company.studentsHired}</TableCell>
                      <TableCell>{company.lastVisit}</TableCell>
                      <TableCell>
                        <Badge variant={
                          company.status === 'Active Partner' ? 'default' : 
                          company.status === 'Scheduled' ? 'secondary' : 'outline'
                        }>
                          {company.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewCompany(company)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleScheduleCompany(company)}>
                            <Calendar className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </Card>
            </motion.div>
          </motion.div>
        );

      case 'applications':
        return (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Placement Applications</h1>
              <p className="text-gray-600">Monitor student applications and placement progress</p>
            </motion.div>
            
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">All Applications</TabsTrigger>
                <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
                <TabsTrigger value="selected">Selected</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4">
                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Package</TableHead>
                        <TableHead>Applied Date</TableHead>
                        <TableHead>Current Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockApplications.map((application) => (
                        <TableRow key={application.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{application.studentName}</p>
                              <p className="text-sm text-gray-600">{application.rollNumber}</p>
                            </div>
                          </TableCell>
                          <TableCell>{application.company}</TableCell>
                          <TableCell>{application.position}</TableCell>
                          <TableCell>{application.package}</TableCell>
                          <TableCell>{application.applicationDate}</TableCell>
                          <TableCell>
                            <div>
                              <Badge variant={
                                application.status === 'Selected' ? 'default' : 
                                application.status === 'Shortlisted' ? 'secondary' : 'outline'
                              }>
                                {application.status}
                              </Badge>
                              <p className="text-xs text-gray-500 mt-1">{application.round}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleViewApplication(application)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleTrackApplication(application)}>
                                <BarChart3 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </TabsContent>
              
              <TabsContent value="shortlisted">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-gray-600">Shortlisted applications will appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="selected">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-gray-600">Successfully placed students will appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="rejected">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-gray-600">Rejected applications will appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        );

      case 'drives':
        return (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="flex justify-between items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Placement Drives</h1>
                <p className="text-gray-600">Schedule and manage company placement drives</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setScheduleNewDriveOpen(true)}>
                <Calendar className="h-4 w-4 mr-2" />
                Schedule New Drive
              </Button>
            </motion.div>
            
            <div className="grid grid-cols-1 gap-6">
              {mockDrives.map((drive, index) => (
                <motion.div
                  key={drive.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <Card>
                    <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{drive.company}</h3>
                          <Badge variant={
                            drive.status === 'Completed' ? 'outline' : 
                            drive.status === 'Scheduled' ? 'default' : 'secondary'
                          }>
                            {drive.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mb-4">
                          <div>
                            <span className="text-gray-600">Date & Time:</span>
                            <p className="font-medium">{drive.date} at {drive.time}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Venue:</span>
                            <p className="font-medium">{drive.venue}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Positions:</span>
                            <p className="font-medium">{drive.positions.join(', ')}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Registration:</span>
                            <p className="font-medium">{drive.registeredStudents}/{drive.eligibleStudents}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewDetails(drive)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleManageStudents(drive)}>
                          <Users className="h-4 w-4 mr-2" />
                          Manage Students
                        </Button>
                        {drive.status !== 'Completed' && (
                          <Button variant="outline" size="sm" onClick={() => handleEditDrive(drive)}>
                            Edit
                          </Button>
                        )}
                      </div>
                    </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 'reports':
        return (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
              <p className="text-gray-600">Comprehensive placement statistics and insights</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Placement Statistics
                    </CardTitle>
                  </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Overall Rate:</span>
                      <span className="font-medium">36%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">CS Department:</span>
                      <span className="font-medium">42%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">IT Department:</span>
                      <span className="font-medium">38%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">EC Department:</span>
                      <span className="font-medium">28%</span>
                    </div>
                  </div>
                </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Package Analysis
                    </CardTitle>
                  </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Highest:</span>
                      <span className="font-medium">15 LPA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Average:</span>
                      <span className="font-medium">8.5 LPA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Median:</span>
                      <span className="font-medium">7.5 LPA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lowest:</span>
                      <span className="font-medium">4.5 LPA</span>
                    </div>
                  </div>
                </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5" />
                      Top Recruiters
                    </CardTitle>
                  </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">TechCorp:</span>
                      <span className="font-medium">12 hires</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Global Consulting:</span>
                      <span className="font-medium">8 hires</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">StartupXYZ:</span>
                      <span className="font-medium">6 hires</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Design Labs:</span>
                      <span className="font-medium">4 hires</span>
                    </div>
                  </div>
                </CardContent>
                </Card>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Generate Reports</CardTitle>
                  <CardDescription>Download detailed placement reports for administration</CardDescription>
                </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button 
                    variant="outline" 
                    className="justify-start"
                    onClick={() => handleGenerateReport('student')}
                    disabled={generatingReport === 'student'}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    {generatingReport === 'student' ? 'Generating...' : 'Student Report'}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start"
                    onClick={() => handleGenerateReport('company')}
                    disabled={generatingReport === 'company'}
                  >
                    <Building className="h-4 w-4 mr-2" />
                    {generatingReport === 'company' ? 'Generating...' : 'Company Report'}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start"
                    onClick={() => handleGenerateReport('analytics')}
                    disabled={generatingReport === 'analytics'}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    {generatingReport === 'analytics' ? 'Generating...' : 'Analytics Report'}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start"
                    onClick={() => handleGenerateReport('placement')}
                    disabled={generatingReport === 'placement'}
                  >
                    <Award className="h-4 w-4 mr-2" />
                    {generatingReport === 'placement' ? 'Generating...' : 'Placement Report'}
                  </Button>
                </div>
              </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex bg-gray-50">
      <Sidebar
        title="College Placement Office"
        items={sidebarItems}
        onLogout={onLogout}
      />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {renderMainContent()}
        </div>
      </main>
      <ChatBot userRole="admin" userName={user?.name || 'Admin'} />

      {/* View Details Dialog */}
      <Dialog open={viewDetailsOpen} onOpenChange={setViewDetailsOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Placement Drive Details</DialogTitle>
            <DialogDescription>
              Complete information about {selectedDrive?.company} placement drive
            </DialogDescription>
          </DialogHeader>
          {selectedDrive && (
            <div className="space-y-6 py-4">
              {/* Basic Information */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Basic Information
                </h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <span className="text-sm text-gray-600">Company</span>
                    <p className="font-medium">{selectedDrive.company}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Status</span>
                    <div className="mt-1">
                      <Badge variant={
                        selectedDrive.status === 'Completed' ? 'outline' : 
                        selectedDrive.status === 'Scheduled' ? 'default' : 'secondary'
                      }>
                        {selectedDrive.status}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Date & Time</span>
                    <p className="font-medium">{selectedDrive.date} at {selectedDrive.time}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Venue</span>
                    <p className="font-medium">{selectedDrive.venue}</p>
                  </div>
                </div>
              </div>

              {/* Positions & Eligibility */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                  Positions & Eligibility
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Open Positions</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedDrive.positions.map((pos: string, idx: number) => (
                        <Badge key={idx} variant="outline">{pos}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-600">Eligible Students</span>
                      <p className="font-medium text-lg">{selectedDrive.eligibleStudents}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Registered Students</span>
                      <p className="font-medium text-lg text-blue-600">{selectedDrive.registeredStudents}</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Eligibility Criteria</span>
                    <ul className="mt-1 space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Minimum CGPA: 7.0
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Final Year Students Only
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        No Active Backlogs
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Package & Benefits */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                  Package & Benefits
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-600">CTC Range</span>
                      <p className="font-medium text-lg">₹8-12 LPA</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Joining Bonus</span>
                      <p className="font-medium">₹50,000</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Additional Benefits</span>
                    <ul className="mt-1 space-y-1 text-sm">
                      <li>• Health Insurance</li>
                      <li>• Performance Bonus</li>
                      <li>• Stock Options (after 1 year)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Selection Process */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  Selection Process
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ol className="space-y-3">
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">1</div>
                      <div>
                        <p className="font-medium">Online Aptitude Test</p>
                        <p className="text-sm text-gray-600">Duration: 60 minutes</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">2</div>
                      <div>
                        <p className="font-medium">Technical Interview</p>
                        <p className="text-sm text-gray-600">Duration: 45 minutes</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">3</div>
                      <div>
                        <p className="font-medium">HR Interview</p>
                        <p className="text-sm text-gray-600">Duration: 30 minutes</p>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Manage Students Dialog */}
      <Dialog open={manageStudentsOpen} onOpenChange={setManageStudentsOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Manage Registered Students</DialogTitle>
            <DialogDescription>
              Update student application status for {selectedDrive?.company} placement drive
            </DialogDescription>
          </DialogHeader>
          {selectedDrive && (
            <div className="py-4">
              <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Total Registered:</span>
                    <p className="font-medium text-lg">{selectedDrive.registeredStudents}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Selected:</span>
                    <p className="font-medium text-lg text-green-600">
                      {Object.values(studentStatuses).filter(s => s === 'Selected').length}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Shortlisted:</span>
                    <p className="font-medium text-lg text-blue-600">
                      {Object.values(studentStatuses).filter(s => s === 'Shortlisted').length}
                    </p>
                  </div>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Roll Number</TableHead>
                    <TableHead>CGPA</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { id: 1, name: 'Alice Johnson', rollNumber: 'CS2021001', cgpa: '8.5' },
                    { id: 2, name: 'Bob Smith', rollNumber: 'CS2021002', cgpa: '9.1' },
                    { id: 3, name: 'David Lee', rollNumber: 'CS2021004', cgpa: '8.8' },
                    { id: 4, name: 'Emma Davis', rollNumber: 'IT2021005', cgpa: '9.0' },
                    { id: 5, name: 'Frank Wilson', rollNumber: 'CS2021006', cgpa: '7.9' },
                  ].map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.rollNumber}</TableCell>
                      <TableCell>{student.cgpa}</TableCell>
                      <TableCell>
                        <Badge variant={
                          studentStatuses[student.id.toString()] === 'Selected' ? 'default' :
                          studentStatuses[student.id.toString()] === 'Shortlisted' ? 'secondary' :
                          studentStatuses[student.id.toString()] === 'Rejected' ? 'destructive' :
                          'outline'
                        }>
                          {studentStatuses[student.id.toString()] || 'Applied'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={studentStatuses[student.id.toString()] || 'Applied'}
                          onValueChange={(value) => handleUpdateStudentStatus(student.id.toString(), value)}
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Applied">Applied</SelectItem>
                            <SelectItem value="Shortlisted">Shortlisted</SelectItem>
                            <SelectItem value="Selected">Selected</SelectItem>
                            <SelectItem value="Rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Drive Dialog */}
      <Dialog open={editDriveOpen} onOpenChange={setEditDriveOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Edit Placement Drive</DialogTitle>
            <DialogDescription>
              Update details for {selectedDrive?.company} placement drive
            </DialogDescription>
          </DialogHeader>
          {selectedDrive && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" defaultValue={selectedDrive.company} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue={selectedDrive.status}>
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                      <SelectItem value="Open for Registration">Open for Registration</SelectItem>
                      <SelectItem value="Registration Closed">Registration Closed</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" defaultValue={selectedDrive.date} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" type="time" defaultValue={selectedDrive.time} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="venue">Venue</Label>
                <Input id="venue" defaultValue={selectedDrive.venue} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="positions">Positions (comma-separated)</Label>
                <Input id="positions" defaultValue={selectedDrive.positions.join(', ')} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="eligibleStudents">Eligible Students</Label>
                  <Input id="eligibleStudents" type="number" defaultValue={selectedDrive.eligibleStudents} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registeredStudents">Registered Students</Label>
                  <Input id="registeredStudents" type="number" defaultValue={selectedDrive.registeredStudents} readOnly className="bg-gray-50" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Drive Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Add details about the placement drive..."
                  rows={4}
                  defaultValue="Join us for an exciting opportunity to be a part of our dynamic team. We are looking for talented individuals who are passionate about technology and innovation."
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setEditDriveOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveDriveChanges} className="bg-blue-600 hover:bg-blue-700">
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add New Company Dialog */}
      <Dialog open={addCompanyOpen} onOpenChange={setAddCompanyOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Add New Company</DialogTitle>
            <DialogDescription>
              Register a new company partner for campus placements
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input id="companyName" placeholder="e.g., TechCorp Solutions" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry *</Label>
                <Select>
                  <SelectTrigger id="industry">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email *</Label>
                <Input id="contactEmail" type="email" placeholder="hr@company.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input id="contactPhone" type="tel" placeholder="+91 9876543210" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pocName">Point of Contact Name</Label>
                <Input id="pocName" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pocDesignation">POC Designation</Label>
                <Input id="pocDesignation" placeholder="HR Manager" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Company Website</Label>
              <Input id="website" type="url" placeholder="https://www.company.com" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="packageRange">Package Range (LPA) *</Label>
                <Input id="packageRange" placeholder="e.g., 8-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employeeCount">Employee Count</Label>
                <Select>
                  <SelectTrigger id="employeeCount">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-50">1-50</SelectItem>
                    <SelectItem value="51-200">51-200</SelectItem>
                    <SelectItem value="201-500">201-500</SelectItem>
                    <SelectItem value="501-1000">501-1000</SelectItem>
                    <SelectItem value="1000+">1000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyAddress">Company Address</Label>
              <Textarea 
                id="companyAddress" 
                placeholder="Enter complete address..."
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyDescription">Company Description</Label>
              <Textarea 
                id="companyDescription" 
                placeholder="Brief description about the company, culture, and opportunities..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hiringRoles">Typical Hiring Roles</Label>
              <Input id="hiringRoles" placeholder="e.g., Software Engineer, Data Analyst, Product Manager" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="partnershipStatus">Partnership Status</Label>
                <Select defaultValue="new">
                  <SelectTrigger id="partnershipStatus">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New Partner</SelectItem>
                    <SelectItem value="active">Active Partner</SelectItem>
                    <SelectItem value="scheduled">Drive Scheduled</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredContactMethod">Preferred Contact</Label>
                <Select defaultValue="email">
                  <SelectTrigger id="preferredContactMethod">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setAddCompanyOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCompany} className="bg-blue-600 hover:bg-blue-700">
                Add Company
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Schedule New Drive Dialog */}
      <Dialog open={scheduleNewDriveOpen} onOpenChange={setScheduleNewDriveOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Schedule New Placement Drive</DialogTitle>
            <DialogDescription>
              Create and schedule a new campus placement drive
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="driveCompany">Select Company *</Label>
              <Select>
                <SelectTrigger id="driveCompany">
                  <SelectValue placeholder="Choose a company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="techcorp">TechCorp Solutions</SelectItem>
                  <SelectItem value="startupxyz">StartupXYZ</SelectItem>
                  <SelectItem value="globalconsult">Global Consulting</SelectItem>
                  <SelectItem value="innovatetech">Innovate Tech</SelectItem>
                  <SelectItem value="dataanalytics">Data Analytics Co.</SelectItem>
                  <SelectItem value="other">Other (Add New)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="driveDate">Drive Date *</Label>
                <Input id="driveDate" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="driveTime">Drive Time *</Label>
                <Input id="driveTime" type="time" defaultValue="10:00" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="driveVenue">Venue *</Label>
              <Select>
                <SelectTrigger id="driveVenue">
                  <SelectValue placeholder="Select venue" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main-auditorium">Main Auditorium</SelectItem>
                  <SelectItem value="conference-hall">Conference Hall</SelectItem>
                  <SelectItem value="seminar-hall">Seminar Hall</SelectItem>
                  <SelectItem value="lecture-hall-1">Lecture Hall 1</SelectItem>
                  <SelectItem value="lecture-hall-2">Lecture Hall 2</SelectItem>
                  <SelectItem value="virtual">Virtual (Online)</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="drivePositions">Open Positions *</Label>
              <Input id="drivePositions" placeholder="e.g., Software Engineer, Data Analyst, Product Manager" />
              <p className="text-xs text-gray-500">Separate multiple positions with commas</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="drivePackage">Package Range (LPA) *</Label>
                <Input id="drivePackage" placeholder="e.g., 8-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="driveOpenings">Number of Openings</Label>
                <Input id="driveOpenings" type="number" placeholder="e.g., 10" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Eligibility Criteria</Label>
              <div className="space-y-3 border rounded-lg p-4 bg-gray-50">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minCGPA" className="text-sm">Minimum CGPA *</Label>
                    <Input id="minCGPA" type="number" step="0.1" placeholder="7.0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxBacklogs" className="text-sm">Max Active Backlogs</Label>
                    <Input id="maxBacklogs" type="number" placeholder="0" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eligibleBranches" className="text-sm">Eligible Branches</Label>
                  <Input id="eligibleBranches" placeholder="e.g., CSE, IT, ECE" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eligibleYears" className="text-sm">Eligible Years</Label>
                  <Select defaultValue="final">
                    <SelectTrigger id="eligibleYears">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="final">Final Year Only</SelectItem>
                      <SelectItem value="prefinal">Pre-Final Year Only</SelectItem>
                      <SelectItem value="both">Both Final & Pre-Final</SelectItem>
                      <SelectItem value="all">All Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Selection Process</Label>
              <div className="space-y-2 border rounded-lg p-4 bg-gray-50">
                <Input placeholder="Round 1: e.g., Aptitude Test (60 min)" />
                <Input placeholder="Round 2: e.g., Technical Interview (45 min)" />
                <Input placeholder="Round 3: e.g., HR Interview (30 min)" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="registrationDeadline">Registration Deadline</Label>
                <Input id="registrationDeadline" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="driveStatus">Drive Status</Label>
                <Select defaultValue="scheduled">
                  <SelectTrigger id="driveStatus">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="open">Open for Registration</SelectItem>
                    <SelectItem value="closed">Registration Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="driveNotes">Additional Notes / Instructions</Label>
              <Textarea 
                id="driveNotes" 
                placeholder="Any special instructions for students, dress code, documents to bring, etc..."
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setScheduleNewDriveOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleScheduleNewDrive} className="bg-blue-600 hover:bg-blue-700">
                Schedule Drive
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Student Details Dialog */}
      <Dialog open={viewStudentOpen} onOpenChange={setViewStudentOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Student Profile Details</DialogTitle>
            <DialogDescription>
              Complete student information and placement records
            </DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-6 py-4">
              {/* Personal Information */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <span className="text-sm text-gray-600">Full Name</span>
                    <p className="font-medium">{selectedStudent.name}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Email</span>
                    <p className="font-medium">{selectedStudent.email}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Phone</span>
                    <p className="font-medium">{selectedStudent.phone}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Date of Birth</span>
                    <p className="font-medium">{selectedStudent.dob}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-sm text-gray-600">Address</span>
                    <p className="font-medium">{selectedStudent.address}</p>
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                  Academic Information
                </h3>
                <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <span className="text-sm text-gray-600">Roll Number</span>
                    <p className="font-medium">{selectedStudent.rollNumber}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Department</span>
                    <p className="font-medium">{selectedStudent.major}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Year</span>
                    <p className="font-medium">{selectedStudent.year}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">CGPA</span>
                    <p className={`font-medium text-lg ${parseFloat(selectedStudent.cgpa) >= 8.0 ? 'text-green-600' : parseFloat(selectedStudent.cgpa) >= 7.0 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {selectedStudent.cgpa}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Active Backlogs</span>
                    <p className={`font-medium ${selectedStudent.backlogs === 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedStudent.backlogs}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Status</span>
                    <Badge variant={
                      selectedStudent.placementStatus === 'Selected' ? 'default' : 
                      selectedStudent.placementStatus === 'Applied' ? 'secondary' : 'outline'
                    }>
                      {selectedStudent.placementStatus}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Placement Status */}
              {selectedStudent.placementStatus === 'Selected' && selectedStudent.placedCompany && (
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Placement Details
                  </h3>
                  <div className="grid grid-cols-3 gap-4 bg-green-50 p-4 rounded-lg border border-green-200">
                    <div>
                      <span className="text-sm text-gray-600">Company</span>
                      <p className="font-medium">{selectedStudent.placedCompany}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Position</span>
                      <p className="font-medium">{selectedStudent.placedPosition}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Package</span>
                      <p className="font-medium text-green-600">{selectedStudent.placedPackage}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Skills */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  Skills & Competencies
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex flex-wrap gap-2">
                    {selectedStudent.skills.map((skill: string, idx: number) => (
                      <Badge key={idx} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                    Internships
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    {selectedStudent.internships.length > 0 ? (
                      selectedStudent.internships.map((internship: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                          <span className="text-sm">{internship}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No internships recorded</p>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Projects
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    {selectedStudent.projects.map((project: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                        <span className="text-sm">{project}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Certifications & Achievements */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Certifications</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    {selectedStudent.certifications.length > 0 ? (
                      selectedStudent.certifications.map((cert: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Award className="h-4 w-4 text-yellow-600 mt-0.5" />
                          <span className="text-sm">{cert}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No certifications</p>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3">Achievements</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    {selectedStudent.achievements.length > 0 ? (
                      selectedStudent.achievements.map((achievement: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Award className="h-4 w-4 text-purple-600 mt-0.5" />
                          <span className="text-sm">{achievement}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No achievements recorded</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Application Summary */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  Application Summary
                </h3>
                <div className="grid grid-cols-3 gap-4 bg-blue-50 p-4 rounded-lg">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{selectedStudent.appliedCompanies}</p>
                    <p className="text-sm text-gray-600">Companies Applied</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {selectedStudent.placementStatus === 'Selected' ? '1' : '0'}
                    </p>
                    <p className="text-sm text-gray-600">Offers Received</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">
                      {selectedStudent.status === 'Placement Ready' ? 'Ready' : selectedStudent.status}
                    </p>
                    <p className="text-sm text-gray-600">Current Status</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setViewStudentOpen(false)}>
                  Close
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Company Details Dialog */}
      <Dialog open={viewCompanyOpen} onOpenChange={setViewCompanyOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Company Profile Details</DialogTitle>
            <DialogDescription>
              Complete company information and partnership history
            </DialogDescription>
          </DialogHeader>
          {selectedCompany && (
            <div className="space-y-6 py-4">
              {/* Basic Information */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Building className="h-5 w-5 text-blue-600" />
                  Company Information
                </h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <span className="text-sm text-gray-600">Company Name</span>
                    <p className="font-medium text-lg">{selectedCompany.name}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Industry</span>
                    <p className="font-medium">{selectedCompany.industry}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Email</span>
                    <p className="font-medium">{selectedCompany.email}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Phone</span>
                    <p className="font-medium">{selectedCompany.phone}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Website</span>
                    <p className="font-medium text-blue-600">{selectedCompany.website}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Founded</span>
                    <p className="font-medium">{selectedCompany.founded}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Employee Count</span>
                    <p className="font-medium">{selectedCompany.employeeCount}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Partnership Status</span>
                    <Badge variant={
                      selectedCompany.status === 'Active Partner' ? 'default' : 
                      selectedCompany.status === 'Scheduled' ? 'secondary' : 'outline'
                    }>
                      {selectedCompany.status}
                    </Badge>
                  </div>
                  <div className="col-span-2">
                    <span className="text-sm text-gray-600">Address</span>
                    <p className="font-medium">{selectedCompany.address}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-sm text-gray-600">Description</span>
                    <p className="text-sm">{selectedCompany.description}</p>
                  </div>
                </div>
              </div>

              {/* Point of Contact */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Point of Contact
                </h3>
                <div className="grid grid-cols-2 gap-4 bg-blue-50 p-4 rounded-lg">
                  <div>
                    <span className="text-sm text-gray-600">Name</span>
                    <p className="font-medium">{selectedCompany.pocName}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Designation</span>
                    <p className="font-medium">{selectedCompany.pocDesignation}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Email</span>
                    <p className="font-medium">{selectedCompany.pocEmail}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Phone</span>
                    <p className="font-medium">{selectedCompany.pocPhone}</p>
                  </div>
                </div>
              </div>

              {/* Hiring Information */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                  Hiring Information
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-600">Package Range</span>
                      <p className="font-medium text-lg text-green-600">{selectedCompany.package}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Total Students Hired</span>
                      <p className="font-medium text-lg">{selectedCompany.studentsHired}</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Typical Hiring Roles</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedCompany.hiringRoles.map((role: string, idx: number) => (
                        <Badge key={idx} variant="outline">{role}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Eligibility Criteria</span>
                    <p className="text-sm mt-1">{selectedCompany.eligibilityCriteria}</p>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  Employee Benefits
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-3">
                    {selectedCompany.benefits.map((benefit: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Past Placement Drives */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Past Placement Drives
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {selectedCompany.pastDrives.length > 0 ? (
                    <div className="space-y-3">
                      {selectedCompany.pastDrives.map((drive: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-center p-3 bg-white rounded border">
                          <div>
                            <p className="font-medium">Year {drive.year}</p>
                            <p className="text-sm text-gray-600">Positions: {drive.positions}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-green-600">{drive.studentsHired} Students Hired</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No past drives recorded</p>
                  )}
                </div>
              </div>

              {/* Upcoming Drive */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  Upcoming Activities
                </h3>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  {selectedCompany.upcomingDrive ? (
                    <div>
                      <p className="font-medium">Next Placement Drive</p>
                      <p className="text-sm text-gray-600 mt-1">Scheduled on: {selectedCompany.upcomingDrive}</p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">No upcoming drives scheduled</p>
                  )}
                </div>
              </div>

              {/* Stats Summary */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-purple-50 p-4 rounded-lg text-center border border-purple-200">
                  <p className="text-2xl font-bold text-purple-600">{selectedCompany.studentsHired}</p>
                  <p className="text-sm text-gray-600">Total Hired</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center border border-green-200">
                  <p className="text-2xl font-bold text-green-600">{selectedCompany.pastDrives.length}</p>
                  <p className="text-sm text-gray-600">Past Drives</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center border border-blue-200">
                  <p className="text-lg font-bold text-blue-600">{selectedCompany.lastVisit}</p>
                  <p className="text-sm text-gray-600">Last Visit</p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setViewCompanyOpen(false)}>
                  Close
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Drive
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Application Details Dialog */}
      <Dialog open={viewApplicationOpen} onOpenChange={setViewApplicationOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Application Details</DialogTitle>
            <DialogDescription>
              Complete application timeline and status information
            </DialogDescription>
          </DialogHeader>
          {selectedApplication && (
            <div className="space-y-6 py-4">
              {/* Application Overview */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Application Overview
                </h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <span className="text-sm text-gray-600">Application ID</span>
                    <p className="font-medium">APP-{selectedApplication.id.toString().padStart(4, '0')}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Application Date</span>
                    <p className="font-medium">{selectedApplication.applicationDate}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Company</span>
                    <p className="font-medium">{selectedApplication.company}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Position</span>
                    <p className="font-medium">{selectedApplication.position}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Package</span>
                    <p className="font-medium text-green-600">{selectedApplication.package}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Current Status</span>
                    <Badge variant={
                      selectedApplication.status === 'Selected' ? 'default' : 
                      selectedApplication.status === 'Shortlisted' ? 'secondary' : 'outline'
                    }>
                      {selectedApplication.status}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Student Information */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Student Information
                </h3>
                <div className="grid grid-cols-2 gap-4 bg-blue-50 p-4 rounded-lg">
                  <div>
                    <span className="text-sm text-gray-600">Name</span>
                    <p className="font-medium">{selectedApplication.studentName}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Roll Number</span>
                    <p className="font-medium">{selectedApplication.rollNumber}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Email</span>
                    <p className="font-medium">{selectedApplication.studentEmail}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Phone</span>
                    <p className="font-medium">{selectedApplication.studentPhone}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Branch</span>
                    <p className="font-medium">{selectedApplication.studentBranch}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">CGPA</span>
                    <p className="font-medium">{selectedApplication.studentCGPA}</p>
                  </div>
                </div>
              </div>

              {/* Application Timeline */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  Application Timeline
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-4">
                    {selectedApplication.timeline.map((stage: any, idx: number) => (
                      <div key={idx} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            stage.status === 'Completed' ? 'bg-green-100 border-2 border-green-500' :
                            stage.status === 'Scheduled' ? 'bg-blue-100 border-2 border-blue-500' :
                            stage.status === 'Pending' ? 'bg-gray-100 border-2 border-gray-300' :
                            'bg-red-100 border-2 border-red-500'
                          }`}>
                            {stage.status === 'Completed' && <CheckCircle className="h-5 w-5 text-green-600" />}
                            {stage.status === 'Scheduled' && <Clock className="h-5 w-5 text-blue-600" />}
                            {stage.status === 'Pending' && <Clock className="h-5 w-5 text-gray-400" />}
                            {stage.status === 'Rejected' && <XCircle className="h-5 w-5 text-red-600" />}
                            {stage.status.includes('Selected') && <CheckCircle className="h-5 w-5 text-green-600" />}
                          </div>
                          {idx < selectedApplication.timeline.length - 1 && (
                            <div className={`w-0.5 h-12 ${
                              stage.status === 'Completed' ? 'bg-green-300' : 'bg-gray-300'
                            }`} />
                          )}
                        </div>
                        <div className="flex-1 pb-8">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{stage.stage}</p>
                              <p className="text-sm text-gray-600">{stage.date}</p>
                              {stage.score && (
                                <p className="text-sm text-blue-600 mt-1">Score: {stage.score}</p>
                              )}
                            </div>
                            <Badge variant={
                              stage.status === 'Completed' || stage.status.includes('Selected') ? 'default' :
                              stage.status === 'Scheduled' ? 'secondary' : 'outline'
                            }>
                              {stage.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Documents Submitted */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Documents Submitted
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex flex-wrap gap-2">
                    {selectedApplication.documents.map((doc: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 bg-white px-3 py-2 rounded border">
                        <FileText className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Notes & Feedback */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  {selectedApplication.status === 'Selected' ? 'Selection Notes' : 
                   selectedApplication.status === 'Rejected' ? 'Rejection Feedback' : 'Recruiter Notes'}
                </h3>
                <div className={`p-4 rounded-lg ${
                  selectedApplication.status === 'Selected' ? 'bg-green-50 border border-green-200' :
                  selectedApplication.status === 'Rejected' ? 'bg-red-50 border border-red-200' :
                  'bg-gray-50'
                }`}>
                  <p className="text-sm">{selectedApplication.notes}</p>
                  {selectedApplication.feedback && (
                    <p className="text-sm mt-2 italic text-gray-600">
                      Feedback: {selectedApplication.feedback}
                    </p>
                  )}
                  {selectedApplication.joiningDate && (
                    <p className="text-sm mt-2 font-medium text-green-600">
                      Expected Joining Date: {selectedApplication.joiningDate}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Summary */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center border border-blue-200">
                  <p className="text-sm text-gray-600">Placement Drive</p>
                  <p className="font-medium mt-1">{selectedApplication.driveDate}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center border border-purple-200">
                  <p className="text-sm text-gray-600">Current Round</p>
                  <p className="font-medium mt-1">{selectedApplication.round}</p>
                </div>
                <div className={`p-4 rounded-lg text-center border-2 ${
                  selectedApplication.status === 'Selected' ? 'bg-green-50 border-green-500' :
                  selectedApplication.status === 'Rejected' ? 'bg-red-50 border-red-500' :
                  'bg-yellow-50 border-yellow-500'
                }`}>
                  <p className="text-sm text-gray-600">Final Status</p>
                  <p className="font-medium mt-1">{selectedApplication.status}</p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setViewApplicationOpen(false)}>
                  Close
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <FileText className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Export Student Data Dialog */}
      <Dialog open={exportStudentDataOpen} onOpenChange={setExportStudentDataOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Download className="h-6 w-6 text-blue-600" />
              Export Student Data
            </DialogTitle>
            <DialogDescription>
              Select export format and data fields to download student information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Export Format Selection */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Export Format
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'csv', label: 'CSV File', desc: 'Comma-separated values' },
                  { value: 'excel', label: 'Excel', desc: 'Microsoft Excel format' },
                  { value: 'pdf', label: 'PDF', desc: 'Portable document format' }
                ].map((format) => (
                  <div
                    key={format.value}
                    onClick={() => setExportFormat(format.value)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      exportFormat === format.value
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <p className="font-medium">{format.label}</p>
                    <p className="text-xs text-gray-600 mt-1">{format.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Fields Selection */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Data Fields to Include
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Personal Information',
                    'Contact Details',
                    'Academic Records',
                    'CGPA & Grades',
                    'Placement Status',
                    'Applied Companies',
                    'Skills & Certifications',
                    'Internship Experience',
                    'Project Details',
                    'Application Timeline',
                    'Interview Results',
                    'Offer Details'
                  ].map((field) => (
                    <label key={field} className="flex items-center gap-2 cursor-pointer hover:bg-white p-2 rounded transition-colors">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm">{field}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Date Range Filter */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Date Range
              </h3>
              <Select value={exportDateRange} onValueChange={setExportDateRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="current">Current Academic Year (2024-25)</SelectItem>
                  <SelectItem value="last">Last Academic Year (2023-24)</SelectItem>
                  <SelectItem value="month">Last 30 Days</SelectItem>
                  <SelectItem value="week">Last 7 Days</SelectItem>
                  <SelectItem value="custom">Custom Date Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Filter Options */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                Additional Filters
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="branch">Branch/Department</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="branch">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Branches</SelectItem>
                      <SelectItem value="cse">Computer Science</SelectItem>
                      <SelectItem value="it">Information Technology</SelectItem>
                      <SelectItem value="ece">Electronics</SelectItem>
                      <SelectItem value="mech">Mechanical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="year">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Years</SelectItem>
                      <SelectItem value="final">Final Year</SelectItem>
                      <SelectItem value="pre-final">Pre-Final Year</SelectItem>
                      <SelectItem value="second">Second Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="placementStatus">Placement Status</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="placementStatus">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="placed">Placed</SelectItem>
                      <SelectItem value="applied">Applied</SelectItem>
                      <SelectItem value="ready">Placement Ready</SelectItem>
                      <SelectItem value="not-eligible">Not Eligible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cgpa">Minimum CGPA</Label>
                  <Select defaultValue="none">
                    <SelectTrigger id="cgpa">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Filter</SelectItem>
                      <SelectItem value="9">9.0 and above</SelectItem>
                      <SelectItem value="8">8.0 and above</SelectItem>
                      <SelectItem value="7">7.0 and above</SelectItem>
                      <SelectItem value="6">6.0 and above</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Summary Info */}
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-blue-900">Export Summary</p>
                  <p className="text-sm text-blue-700 mt-1">
                    Approximately <strong>247 student records</strong> will be included in this export based on current filters.
                  </p>
                  <p className="text-xs text-blue-600 mt-2">
                    <strong>Note:</strong> Sensitive personal information will be handled according to data protection policies.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setExportStudentDataOpen(false)}
                disabled={exportLoading}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleExportStudentData}
                className="bg-blue-600 hover:bg-blue-700"
                disabled={exportLoading}
              >
                {exportLoading ? (
                  <>
                    <motion.div
                      className="mr-2"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Download className="h-4 w-4" />
                    </motion.div>
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Student Dialog */}
      <Dialog open={editStudentOpen} onOpenChange={setEditStudentOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Edit className="h-6 w-6 text-blue-600" />
              Edit Student Profile
            </DialogTitle>
            <DialogDescription>
              Update student information and placement eligibility
            </DialogDescription>
          </DialogHeader>
          {selectedStudentForEdit && (
            <div className="space-y-6 py-4">
              {/* Personal Information */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Full Name</Label>
                    <Input id="edit-name" defaultValue={selectedStudentForEdit.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-email">Email Address</Label>
                    <Input id="edit-email" type="email" defaultValue={selectedStudentForEdit.email} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-phone">Phone Number</Label>
                    <Input id="edit-phone" defaultValue={selectedStudentForEdit.phone} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-dob">Date of Birth</Label>
                    <Input id="edit-dob" defaultValue={selectedStudentForEdit.dob} />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="edit-address">Address</Label>
                    <Input id="edit-address" defaultValue={selectedStudentForEdit.address} />
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                  Academic Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-roll">Roll Number</Label>
                    <Input id="edit-roll" defaultValue={selectedStudentForEdit.rollNumber} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-major">Major/Department</Label>
                    <Select defaultValue={selectedStudentForEdit.major}>
                      <SelectTrigger id="edit-major">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Computer Science">Computer Science</SelectItem>
                        <SelectItem value="Information Technology">Information Technology</SelectItem>
                        <SelectItem value="Electronics">Electronics</SelectItem>
                        <SelectItem value="Mechanical">Mechanical</SelectItem>
                        <SelectItem value="Civil">Civil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-year">Year</Label>
                    <Select defaultValue={selectedStudentForEdit.year}>
                      <SelectTrigger id="edit-year">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Final Year">Final Year</SelectItem>
                        <SelectItem value="Pre-Final Year">Pre-Final Year</SelectItem>
                        <SelectItem value="Second Year">Second Year</SelectItem>
                        <SelectItem value="First Year">First Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-cgpa">CGPA</Label>
                    <Input id="edit-cgpa" type="number" step="0.01" defaultValue={selectedStudentForEdit.cgpa} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-backlogs">Active Backlogs</Label>
                    <Input id="edit-backlogs" type="number" defaultValue={selectedStudentForEdit.backlogs} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-status">Placement Status</Label>
                    <Select defaultValue={selectedStudentForEdit.placementStatus}>
                      <SelectTrigger id="edit-status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Placement Ready">Placement Ready</SelectItem>
                        <SelectItem value="Applied">Applied</SelectItem>
                        <SelectItem value="Selected">Selected</SelectItem>
                        <SelectItem value="Not Eligible">Not Eligible</SelectItem>
                        <SelectItem value="Not Applied">Not Applied</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Skills & Competencies */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  Skills & Competencies
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-skills">Technical Skills (comma-separated)</Label>
                    <Textarea 
                      id="edit-skills" 
                      rows={2}
                      defaultValue={selectedStudentForEdit.skills?.join(', ')}
                      placeholder="e.g., React, Node.js, Python, Java, MySQL"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-certifications">Certifications (comma-separated)</Label>
                    <Textarea 
                      id="edit-certifications" 
                      rows={2}
                      defaultValue={selectedStudentForEdit.certifications?.join(', ')}
                      placeholder="e.g., AWS Certified, Google Analytics"
                    />
                  </div>
                </div>
              </div>

              {/* Placement Details (if placed) */}
              {selectedStudentForEdit.placementStatus === 'Selected' && (
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                    Placement Details
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-company">Placed Company</Label>
                      <Input id="edit-company" defaultValue={selectedStudentForEdit.placedCompany} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-package">Package (LPA)</Label>
                      <Input id="edit-package" defaultValue={selectedStudentForEdit.placedPackage} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-position">Position</Label>
                      <Input id="edit-position" defaultValue={selectedStudentForEdit.placedPosition} />
                    </div>
                  </div>
                </div>
              )}

              {/* Admin Notes */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Admin Notes
                </h3>
                <Textarea 
                  rows={3}
                  placeholder="Add any additional notes about this student..."
                  defaultValue="Student shows strong technical aptitude and good communication skills."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button 
                  variant="outline" 
                  onClick={() => setEditStudentOpen(false)}
                  disabled={editStudentLoading}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSaveStudentChanges}
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={editStudentLoading}
                >
                  {editStudentLoading ? (
                    <>
                      <motion.div
                        className="mr-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Edit className="h-4 w-4" />
                      </motion.div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Track Application Dialog */}
      <Dialog open={trackApplicationOpen} onOpenChange={setTrackApplicationOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-blue-600" />
              Application Tracking
            </DialogTitle>
            <DialogDescription>
              Real-time tracking of placement application progress
            </DialogDescription>
          </DialogHeader>
          {selectedApplicationForTrack && (
            <div className="space-y-6 py-4">
              {/* Application Summary */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-lg border border-blue-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Student</p>
                    <p className="font-semibold text-lg">{selectedApplicationForTrack.studentName}</p>
                    <p className="text-sm text-gray-600">{selectedApplicationForTrack.rollNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Company & Position</p>
                    <p className="font-semibold text-lg">{selectedApplicationForTrack.company}</p>
                    <p className="text-sm text-gray-600">{selectedApplicationForTrack.position}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Package Offered</p>
                    <p className="font-semibold text-lg text-green-600">{selectedApplicationForTrack.package}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Current Status</p>
                    <Badge 
                      className="mt-1"
                      variant={
                        selectedApplicationForTrack.status === 'Selected' ? 'default' : 
                        selectedApplicationForTrack.status === 'Shortlisted' ? 'secondary' : 'outline'
                      }
                    >
                      {selectedApplicationForTrack.status}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Progress Timeline */}
              <div>
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  Application Progress Timeline
                </h3>
                <div className="space-y-4">
                  {selectedApplicationForTrack.timeline.map((stage: any, idx: number) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="flex flex-col items-center">
                        <motion.div 
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            stage.status === 'Completed' ? 'bg-green-100 border-2 border-green-500' :
                            stage.status === 'Scheduled' ? 'bg-blue-100 border-2 border-blue-500' :
                            stage.status === 'Pending' ? 'bg-gray-100 border-2 border-gray-300' :
                            stage.status.includes('Selected') ? 'bg-green-100 border-2 border-green-500' :
                            'bg-red-100 border-2 border-red-500'
                          }`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3, delay: idx * 0.1 + 0.2 }}
                        >
                          {stage.status === 'Completed' && <CheckCircle className="h-6 w-6 text-green-600" />}
                          {stage.status === 'Scheduled' && <Clock className="h-6 w-6 text-blue-600" />}
                          {stage.status === 'Pending' && <Clock className="h-6 w-6 text-gray-400" />}
                          {stage.status === 'Rejected' && <XCircle className="h-6 w-6 text-red-600" />}
                          {stage.status.includes('Selected') && <CheckCircle className="h-6 w-6 text-green-600" />}
                        </motion.div>
                        {idx < selectedApplicationForTrack.timeline.length - 1 && (
                          <div className={`w-0.5 h-16 ${
                            stage.status === 'Completed' || stage.status.includes('Selected') ? 'bg-green-300' : 'bg-gray-300'
                          }`} />
                        )}
                      </div>
                      <div className={`flex-1 pb-8 p-4 rounded-lg border ${
                        stage.status === 'Completed' ? 'bg-green-50 border-green-200' :
                        stage.status === 'Scheduled' ? 'bg-blue-50 border-blue-200' :
                        stage.status.includes('Selected') ? 'bg-green-50 border-green-200' :
                        stage.status === 'Rejected' ? 'bg-red-50 border-red-200' :
                        'bg-gray-50 border-gray-200'
                      }`}>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold text-lg">{stage.stage}</p>
                            <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                              <Calendar className="h-3 w-3" />
                              {stage.date}
                            </p>
                          </div>
                          <Badge variant={
                            stage.status === 'Completed' || stage.status.includes('Selected') ? 'default' :
                            stage.status === 'Scheduled' ? 'secondary' : 'outline'
                          }>
                            {stage.status}
                          </Badge>
                        </div>
                        {stage.score && (
                          <div className="mt-2 flex items-center gap-2">
                            <Award className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-medium text-blue-600">Score: {stage.score}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Overall Statistics */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  Application Statistics
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-center">
                    <p className="text-sm text-gray-600">Total Rounds</p>
                    <p className="text-2xl font-bold text-blue-600">{selectedApplicationForTrack.timeline.length}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
                    <p className="text-sm text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-green-600">
                      {selectedApplicationForTrack.timeline.filter((s: any) => s.status === 'Completed').length}
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-center">
                    <p className="text-sm text-gray-600">Days Since Applied</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {Math.floor((new Date().getTime() - new Date(selectedApplicationForTrack.applicationDate).getTime()) / (1000 * 60 * 60 * 24))}
                    </p>
                  </div>
                </div>
              </div>

              {/* Documents & Notes */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Documents Submitted
                  </h3>
                  <div className="bg-gray-50 p-3 rounded-lg border space-y-2">
                    {selectedApplicationForTrack.documents.map((doc: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Recruiter Notes
                  </h3>
                  <div className="bg-gray-50 p-3 rounded-lg border">
                    <p className="text-sm text-gray-700">{selectedApplicationForTrack.notes}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-4 border-t">
                <Button 
                  variant="outline" 
                  onClick={handleDownloadApplicationReport}
                  disabled={downloadReportLoading}
                >
                  {downloadReportLoading ? (
                    <>
                      <motion.div
                        className="mr-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Download className="h-4 w-4" />
                      </motion.div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4 mr-2" />
                      Download Report
                    </>
                  )}
                </Button>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setTrackApplicationOpen(false)}>
                    Close
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleContactStudent}>
                    <Users className="h-4 w-4 mr-2" />
                    Contact Student
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Schedule Company Interaction Dialog */}
      <Dialog open={scheduleCompanyOpen} onOpenChange={setScheduleCompanyOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Calendar className="h-6 w-6 text-blue-600" />
              Schedule Company Interaction
            </DialogTitle>
            <DialogDescription>
              Schedule meetings, campus visits, or placement drives with recruitment partners
            </DialogDescription>
          </DialogHeader>
          {selectedCompanyForSchedule && (
            <div className="space-y-6 py-4">
              {/* Company Info */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 p-3 rounded-lg">
                    <Building className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{selectedCompanyForSchedule.name}</p>
                    <p className="text-sm text-gray-600">{selectedCompanyForSchedule.industry} • {selectedCompanyForSchedule.email}</p>
                  </div>
                </div>
              </div>

              {/* Interaction Type */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                  Interaction Type
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 border-2 border-blue-200 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded">
                        <Building className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold">Campus Visit</p>
                        <p className="text-sm text-gray-600">On-campus recruitment</p>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-100 p-2 rounded">
                        <Users className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-semibold">Virtual Meeting</p>
                        <p className="text-sm text-gray-600">Online discussion</p>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-2 rounded">
                        <GraduationCap className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold">Placement Drive</p>
                        <p className="text-sm text-gray-600">Full recruitment event</p>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-orange-100 p-2 rounded">
                        <FileText className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-semibold">HR Discussion</p>
                        <p className="text-sm text-gray-600">Strategy meeting</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Date & Time */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  Schedule Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="schedule-date">Date</Label>
                    <Input 
                      id="schedule-date" 
                      type="date" 
                      defaultValue={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="schedule-time">Time</Label>
                    <Input 
                      id="schedule-time" 
                      type="time" 
                      defaultValue="10:00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="schedule-duration">Duration</Label>
                    <Select defaultValue="2">
                      <SelectTrigger id="schedule-duration">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0.5">30 minutes</SelectItem>
                        <SelectItem value="1">1 hour</SelectItem>
                        <SelectItem value="1.5">1.5 hours</SelectItem>
                        <SelectItem value="2">2 hours</SelectItem>
                        <SelectItem value="3">3 hours</SelectItem>
                        <SelectItem value="4">4 hours</SelectItem>
                        <SelectItem value="full">Full Day</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="schedule-timezone">Timezone</Label>
                    <Select defaultValue="ist">
                      <SelectTrigger id="schedule-timezone">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ist">IST (India)</SelectItem>
                        <SelectItem value="est">EST (US East)</SelectItem>
                        <SelectItem value="pst">PST (US West)</SelectItem>
                        <SelectItem value="gmt">GMT (UK)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Location/Link */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Building className="h-5 w-5 text-blue-600" />
                  Venue Information
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="schedule-location">Location/Venue</Label>
                    <Input 
                      id="schedule-location" 
                      placeholder="e.g., Seminar Hall A, Main Campus"
                      defaultValue="Conference Room, Placement Office"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="schedule-link">Meeting Link (for virtual)</Label>
                    <Input 
                      id="schedule-link" 
                      type="url"
                      placeholder="e.g., https://meet.google.com/xxx-xxxx-xxx"
                    />
                  </div>
                </div>
              </div>

              {/* Coordinator & Attendees */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Coordination Team
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="schedule-coordinator">Primary Coordinator</Label>
                    <Select defaultValue="admin1">
                      <SelectTrigger id="schedule-coordinator">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin1">Dr. Sarah Johnson - Placement Head</SelectItem>
                        <SelectItem value="admin2">Prof. Michael Chen - Training Officer</SelectItem>
                        <SelectItem value="admin3">Ms. Priya Sharma - HR Coordinator</SelectItem>
                        <SelectItem value="admin4">Mr. Rajesh Kumar - Admin Assistant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="schedule-attendees">Expected Attendees</Label>
                    <Input 
                      id="schedule-attendees" 
                      type="number"
                      defaultValue="50"
                      placeholder="Number of students"
                    />
                  </div>
                </div>
              </div>

              {/* Agenda & Notes */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Agenda & Notes
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="schedule-agenda">Meeting Agenda</Label>
                    <Textarea 
                      id="schedule-agenda" 
                      rows={3}
                      placeholder="Key discussion points and objectives..."
                      defaultValue="1. Company presentation and overview&#10;2. Job role descriptions&#10;3. Eligibility criteria discussion&#10;4. Q&A session with students"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="schedule-notes">Additional Notes</Label>
                    <Textarea 
                      id="schedule-notes" 
                      rows={2}
                      placeholder="Any special requirements or instructions..."
                    />
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="bg-yellow-600 p-2 rounded-lg">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-yellow-900">Notification Settings</p>
                    <div className="mt-2 space-y-2 text-sm text-yellow-700">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        Send calendar invites to coordinator team
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        Notify company HR via email
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        Send reminders 24 hours before
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        Notify eligible students
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button 
                  variant="outline" 
                  onClick={() => setScheduleCompanyOpen(false)}
                  disabled={scheduleCompanyLoading}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSaveSchedule}
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={scheduleCompanyLoading}
                >
                  {scheduleCompanyLoading ? (
                    <>
                      <motion.div
                        className="mr-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Calendar className="h-4 w-4" />
                      </motion.div>
                      Scheduling...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Schedule Interaction
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Contact Student Dialog */}
      <Dialog open={contactStudentOpen} onOpenChange={setContactStudentOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Users className="h-6 w-6 text-blue-600" />
              Contact Student
            </DialogTitle>
            <DialogDescription>
              Send updates, invitations, or important notifications to the student
            </DialogDescription>
          </DialogHeader>
          {selectedApplicationForTrack && (
            <div className="space-y-6 py-4">
              {/* Student Info Card */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-600 p-3 rounded-lg">
                      <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{selectedApplicationForTrack.studentName}</p>
                      <p className="text-sm text-gray-600">{selectedApplicationForTrack.department} • Roll: {selectedApplicationForTrack.rollNo}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-sm">
                    {selectedApplicationForTrack.position}
                  </Badge>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">{selectedApplicationForTrack.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">Applied: {selectedApplicationForTrack.appliedDate}</span>
                  </div>
                </div>
              </div>

              {/* Communication Method */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Communication Method
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 border-2 border-blue-200 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold">Email</p>
                        <p className="text-sm text-gray-600">student@college.edu</p>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-2 rounded">
                        <Users className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold">SMS</p>
                        <p className="text-sm text-gray-600">+91-9876543210</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Message Template */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  Message Template
                </h3>
                <Select defaultValue="custom">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="custom">Custom Message</SelectItem>
                    <SelectItem value="interview">Interview Invitation</SelectItem>
                    <SelectItem value="status">Application Status Update</SelectItem>
                    <SelectItem value="documents">Document Request</SelectItem>
                    <SelectItem value="offer">Offer Letter Notification</SelectItem>
                    <SelectItem value="rejection">Application Update</SelectItem>
                    <SelectItem value="reminder">Deadline Reminder</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Subject */}
              <div>
                <Label htmlFor="contact-subject">Subject</Label>
                <Input 
                  id="contact-subject" 
                  placeholder="Enter message subject..."
                  defaultValue={`Update: ${selectedApplicationForTrack.position} Application at ${selectedApplicationForTrack.company}`}
                  className="mt-2"
                />
              </div>

              {/* Message */}
              <div>
                <Label htmlFor="contact-message">Message</Label>
                <Textarea 
                  id="contact-message" 
                  rows={8}
                  placeholder="Type your message here..."
                  defaultValue={`Dear ${selectedApplicationForTrack.studentName},\n\nWe are writing to update you regarding your application for the ${selectedApplicationForTrack.position} position at ${selectedApplicationForTrack.company}.\n\nYour application is currently being reviewed by the company's HR team. We will keep you informed of any developments.\n\nIf you have any questions, please feel free to contact the placement office.\n\nBest regards,\nCollege Placement Office`}
                  className="mt-2"
                />
              </div>

              {/* Attachments */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Attachments (Optional)
                </h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <Download className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload files or drag and drop</p>
                  <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX up to 10MB</p>
                </div>
              </div>

              {/* Options */}
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-blue-900">Delivery Options</p>
                    <div className="mt-2 space-y-2 text-sm text-blue-700">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        Send copy to placement coordinator
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        Mark as high priority
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        Request read receipt
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        Schedule for later delivery
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button 
                  variant="outline" 
                  onClick={() => setContactStudentOpen(false)}
                  disabled={contactStudentLoading}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSendMessage}
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={contactStudentLoading}
                >
                  {contactStudentLoading ? (
                    <>
                      <motion.div
                        className="mr-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Users className="h-4 w-4" />
                      </motion.div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}