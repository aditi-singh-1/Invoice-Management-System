package com.higradius;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

@WebServlet("/Delete")
public class Delete extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	            // Driver and Database URL
				static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
				static final String DB_URL = "jdbc:mysql://localhost/h2h_internship";
				
				// Authentication Credentials
				static final String DB_USER = "root";
				static final String DB_PASS = "new_password";

				//Creating required Objects
				static Connection con = null;
				static PreparedStatement pst = null;
				
   
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");					
			con = DriverManager.getConnection(DB_URL,DB_USER,DB_PASS);
			String query = "DELETE FROM invoice_details WHERE doc_id=?;";
			String req = request.getParameter("req");
			PreparedStatement pst = con.prepareStatement(query);
			pst.setString(1, req);
			pst.executeUpdate();
		}catch(Exception e) {
			e.printStackTrace();
		}
	}

	}
