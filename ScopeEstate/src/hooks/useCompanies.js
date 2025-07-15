import { useState, useEffect } from 'react';

const useCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        // Replace with actual API call
        const mockCompanies = [
          {
            id: 1,
            name: "Acme Corp",
            package: "Premium (Annual)",
            registered: "3 months ago",
            employees: "15/20",
            clients: 12,
            users: 27,
            lastActivity: "2 hours ago",
            status: "Active",
          },
          // ... more companies
        ];
        setCompanies(mockCompanies);
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const addCompany = (newCompany) => {
    setCompanies([...companies, {
      ...newCompany,
      id: Math.max(...companies.map(c => c.id), 0) + 1,
      status: "Active",
      registered: new Date().toLocaleDateString()
    }]);
  };

  const deleteCompany = (id) => {
    setCompanies(companies.filter(company => company.id !== id));
  };

  return { companies, loading, addCompany, deleteCompany };
};

export default useCompanies;