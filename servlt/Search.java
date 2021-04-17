package com.higradius;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.LinkedHashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;


@WebServlet("/Search")
public class Search extends HttpServlet {
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
			PrintWriter out = response.getWriter();
			Class.forName("com.mysql.cj.jdbc.Driver");					// Registering JDBC Driver
			con = DriverManager.getConnection(DB_URL,DB_USER,DB_PASS);
			String sql = "Select `name_customer`,`cust_number`,`doc_id`,`total_open_amount`,`due_in_date`,`clear_date`,`document_create_date`,`notes` from invoice_details WHERE doc_id LIKE ? LIMIT 20";
			String doc_id = request.getParameter("doc_id");
			ArrayList<LinkedHashMap<String,String>> arrList = new ArrayList<>();
			pst = con.prepareStatement(sql);
			pst.setString(1,doc_id+"%");
			System.out.println(sql);
			ResultSet rs = pst.executeQuery();  
			while(rs.next()) {
				LinkedHashMap<String,String> arr = new LinkedHashMap<>();
				arr.put("Customer Name",rs.getString(1));
				arr.put("Customer #",rs.getString(2));
				arr.put("Invoice #",rs.getString(3));
				arr.put("Invoice Amount",rs.getString(4));
				arr.put("Due Date",rs.getString(5));
				arr.put("Predict Payment Date",rs.getString(6));
				arr.put("Predict Aging Bucket",rs.getString(7));
				arr.put("Notes",rs.getString(8));
				arrList.add(arr);    
			}	
			Gson gson = new Gson();
			String fulltable= gson.toJson(arrList);
			response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            out.print(fulltable);
            out.flush();
		}
		catch(Exception e) {
			e.printStackTrace();
		
	}
	}

	
}
