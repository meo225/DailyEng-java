package com.dailyeng.vocabulary;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface TopicGroupRepository extends JpaRepository<TopicGroup, String> {

    @Query(value = "SELECT * FROM \"TopicGroup\" WHERE \"hubType\" = CAST(:hubType AS \"HubType\") AND \"language\" = :language ORDER BY \"order\" ASC",
            nativeQuery = true)
    List<TopicGroup> findByHubTypeAndLanguageOrderByOrderAsc(@Param("hubType") String hubType, @Param("language") String language);
}
